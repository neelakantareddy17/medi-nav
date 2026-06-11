// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth as firebaseGetAuth, Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpg-fgtyEP_-PlxFwCTOxyifZAkTz_KAM",
  authDomain: "mediiq-afb72.firebaseapp.com",
  projectId: "mediiq-afb72",
  storageBucket: "mediiq-afb72.firebasestorage.app",
  messagingSenderId: "633349088772",
  appId: "1:633349088772:web:1d2177f8375d2d5b27f751",
  measurementId: "G-BTZM8C6DP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
