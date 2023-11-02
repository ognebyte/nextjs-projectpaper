import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_FUNC = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(FIREBASE_AUTH, "http://localhost:9099");
  connectFirestoreEmulator(FIREBASE_DB, "localhost", 8080);
  connectFunctionsEmulator(FIREBASE_FUNC, "localhost", 5001);
}