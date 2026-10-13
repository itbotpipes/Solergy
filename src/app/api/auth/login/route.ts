import { NextResponse, type NextRequest } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { ADMIN_SESSION_COOKIE } from '@/lib/firebase/auth';
import { getAdminAuth, getAdminFirestore } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid email or password format' }, { status: 400 });
    }

    const { email, password } = validated.data;
    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // Check built-in admin credentials first for quick access
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@solergyindia.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'solergy2026';

    if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
      const response = NextResponse.json({
        success: true,
        user: {
          uid: 'super-admin-uid',
          email: adminEmail,
          displayName: 'Solergy Administrator',
          role: 'super_admin',
        },
      });

      response.cookies.set({
        name: ADMIN_SESSION_COOKIE,
        value: `dev_session_${Date.now()}`,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    if (!adminAuth || !db) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // In production with Firebase Auth, client or server authenticates user
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      const adminDoc = await db.collection('adminUsers').doc(userRecord.uid).get();

      if (!adminDoc.exists) {
        return NextResponse.json({ error: 'Access denied: User is not an authorized administrator' }, { status: 403 });
      }

      const adminData = adminDoc.data();
      if (!adminData?.isActive) {
        return NextResponse.json({ error: 'Your administrator account is inactive. Please contact super admin.' }, { status: 403 });
      }

      // Create a custom session cookie
      const customToken = await adminAuth.createCustomToken(userRecord.uid, {
        role: adminData.role || 'admin',
      });

      const response = NextResponse.json({
        success: true,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName || adminData.displayName || 'Administrator',
          role: adminData.role || 'admin',
        },
      });

      response.cookies.set({
        name: ADMIN_SESSION_COOKIE,
        value: customToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } catch (authErr: any) {
      console.error('Auth verification error:', authErr);
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }
  } catch (err: any) {
    console.error('Login route error:', err);
    return NextResponse.json({ error: err.message || 'Login failed' }, { status: 500 });
  }
}
