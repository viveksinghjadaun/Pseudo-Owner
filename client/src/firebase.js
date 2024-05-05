// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-pseudoowner.firebaseapp.com",
  projectId: "mern-pseudoowner",
  storageBucket: "mern-pseudoowner.appspot.com",
  messagingSenderId: "538609063737",
  appId: "1:538609063737:web:01a2e5cd51181dd105fae8",
  measurementId: "G-49W4M5ZQS5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);