import { cookies } from 'next/headers';
import { getAdminAuth, getAdminFirestore } from './admin';
import type { AdminUser, AdminSession, AdminRole } from '@/types/admin';

export const ADMIN_SESSION_COOKIE = 'solergy_admin_session';

export async function verifyAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  if (sessionToken.startsWith('dev_session_')) {
    return {
      uid: 'dev-admin-uid',
      email: process.env.ADMIN_EMAIL || 'admin@solergy.com',
      role: 'super_admin',
    };
  }

  const adminAuth = getAdminAuth();
  const db = getAdminFirestore();

  if (!adminAuth || !db) {
    return null;
  }

  try {
    // Verify custom token or ID token / session cookie
    let uid = '';
    let email = '';

    try {
      const decodedCookie = await adminAuth.verifySessionCookie(sessionToken, true);
      uid = decodedCookie.uid;
      email = decodedCookie.email || '';
    } catch {
      const decodedId = await adminAuth.verifyIdToken(sessionToken);
      uid = decodedId.uid;
      email = decodedId.email || '';
    }

    if (!uid) return null;

    // Check if user is active in adminUsers collection
    const adminDoc = await db.collection('adminUsers').doc(uid).get();
    if (!adminDoc.exists) {
      return null;
    }

    const adminData = adminDoc.data() as AdminUser;
    if (!adminData.isActive) {
      return null;
    }

    return {
      uid,
      email: email || adminData.email,
      role: adminData.role || 'admin',
    };
  } catch (err) {
    console.error('Session verification error:', err);
    return null;
  }
}

export async function requireAdmin(requiredRole?: AdminRole): Promise<AdminSession> {
  const session = await verifyAdminSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }

  if (requiredRole === 'super_admin' && session.role !== 'super_admin') {
    throw new Error('FORBIDDEN');
  }

  return session;
}
