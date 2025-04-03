/**
 * Author: Pranav Kalsi,
 * Last Modified: March 7th
 * Purpose: Firebase config file
 *
 * FIREBASE and backend Related operations and respective state management completed by Pranav Kalsi
 */

// https://firebase.google.com/
// https://mui.com/material-ui/material-icons/
// https://mui.com/material-ui/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApnHD_y14j6Lharwb0V0VrZMNtI3z4Do8",
  authDomain: "rapidcare-101.firebaseapp.com",
  projectId: "rapidcare-101",
  storageBucket: "rapidcare-101.firebasestorage.app",
  messagingSenderId: "680548870359",
  appId: "1:680548870359:web:6cb4c7e91c455e90226892",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
