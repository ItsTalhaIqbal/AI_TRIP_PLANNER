// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Corrected the import statement

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHtICG_nS3QB8TKf3sQebjLYpo9-hAzgk",
  authDomain: "ai-trip-planner-01.firebaseapp.com",
  projectId: "ai-trip-planner-01",
  storageBucket: "ai-trip-planner-01.appspot.com", // Corrected the storage bucket URL
  messagingSenderId: "1063887874632",
  appId: "1:1063887874632:web:536bc78a30e0f527e2467d",
  measurementId: "G-KN9R74Z76R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
