import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTr5LHG3HfSLZM5-FTZZKaahzB9xadXGY",
  authDomain: "prepwise-1c4f2.firebaseapp.com",
  projectId: "prepwise-1c4f2",
  storageBucket: "prepwise-1c4f2.firebasestorage.app",
  messagingSenderId: "709149298999",
  appId: "1:709149298999:web:2d237750b0ae51169e8ab2",
  measurementId: "G-3MG0VGNKCM"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);