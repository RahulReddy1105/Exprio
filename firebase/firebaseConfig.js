// Import Firebase services you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config (same as in your script)
const firebaseConfig = {
  apiKey: "AIzaSyBiym9WhfL6P7_TlA_tqXXYBIVy2Hpbtic",
  authDomain: "inventory-ef77b.firebaseapp.com",
  projectId: "inventory-ef77b",
  storageBucket: "inventory-ef77b.firebasestorage.app",
  messagingSenderId: "239424605843",
  appId: "1:239424605843:web:60697606a0d2d820134766",
  measurementId: "G-0RVM0JM9HN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// Export the services you need
export { db, auth };