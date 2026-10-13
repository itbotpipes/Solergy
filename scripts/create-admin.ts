/**
 * Solergy Admin Provisioning Script
 *
 * Usage:
 *   npx ts-node scripts/create-admin.ts <email> <password> <displayName> [role]
 *
 * Example:
 *   npx ts-node scripts/create-admin.ts admin@solergy.com SecurePassword123! "Super Admin" super_admin
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

async function main() {
  const [email, password, displayName, role = "super_admin"] = process.argv.slice(2);

  if (!email || !password) {
    console.error("Error: Missing email or password.");
    console.log("Usage: npx ts-node scripts/create-admin.ts <email> <password> <displayName> [role]");
    process.exit(1);
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.error("Error: Missing Firebase Admin environment variables in .env.local");
    console.log("Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY");
    process.exit(1);
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  const auth = getAuth();
  const db = getFirestore();

  try {
    console.log(`Creating Firebase Auth user for ${email}...`);
    let user;
    try {
      user = await auth.getUserByEmail(email);
      console.log(`User ${email} already exists (UID: ${user.uid}). Updating password...`);
      await auth.updateUser(user.uid, { password, displayName });
    } catch {
      user = await auth.createUser({
        email,
        password,
        displayName: displayName || "Solergy Admin",
      });
      console.log(`User created successfully with UID: ${user.uid}`);
    }

    // Set custom claims
    await auth.setCustomUserClaims(user.uid, {
      admin: true,
      role,
    });
    console.log(`Set custom claims: { admin: true, role: '${role}' }`);

    // Write to Firestore adminUsers collection
    const adminUserRef = db.collection("adminUsers").doc(user.uid);
    await adminUserRef.set({
      id: user.uid,
      email,
      displayName: displayName || "Solergy Admin",
      role,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    console.log(`Created admin document in Firestore /adminUsers/${user.uid}`);
    console.log(`\n🎉 Admin user "${email}" provisioned successfully as "${role}".`);
  } catch (error) {
    console.error("Failed to provision admin:", error);
    process.exit(1);
  }
}

main();
