import { cert, getApps, initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from '@firebase/firestore'

const initFirebaseAdmin = () => {
  const apps = getApps();

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    })
  }

  return {
    auth: getAuth(),
    db: admin.firestore()
  }
}

export const { auth, db } = initFirebaseAdmin();
