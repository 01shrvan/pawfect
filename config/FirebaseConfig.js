import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pawfect-1e636.firebaseapp.com",
  projectId: "pawfect-1e636",
  storageBucket: "pawfect-1e636.appspot.com",
  messagingSenderId: "987056072621",
  appId: "1:987056072621:web:70d43a7e6efeee7cdc2324",
  measurementId: "G-HTGCSKQE8X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
