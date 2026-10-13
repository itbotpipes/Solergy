import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyBUiIdmUXpN6UMt5Mnn6PkITy2tEWXZmiQ",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "solergy-84f29.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "solergy-84f29",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "solergy-84f29.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "815754875804",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:815754875804:web:b0a70999d56362488aae59",
};

export const getFirebaseApp = (): FirebaseApp => {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
};

export const getClientAuth = (): Auth => {
  return getAuth(getFirebaseApp());
};

export const getClientFirestore = (): Firestore => {
  return getFirestore(getFirebaseApp());
};
