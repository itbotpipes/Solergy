import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

let adminApp: App | null = null;

export function getFirebaseAdminApp(): App | null {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]!;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  // Only initialize Firebase Admin if full service account credentials are provided
  if (projectId && clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      return adminApp;
    } catch (err) {
      console.warn("Firebase Admin initialization error:", err);
      return null;
    }
  }

  // If in production with Google Application Default Credentials explicitly configured
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS && projectId) {
    try {
      adminApp = initializeApp({
        projectId,
      });
      return adminApp;
    } catch {
      return null;
    }
  }

  return null;
}

export function getAdminFirestore(): Firestore | null {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  try {
    return getFirestore(app);
  } catch {
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  try {
    return getAuth(app);
  } catch {
    return null;
  }
}
