// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApnHD_y14j6Lharwb0V0VrZMNtI3z4Do8",
  authDomain: "rapidcare-101.firebaseapp.com",
  projectId: "rapidcare-101",
  storageBucket: "rapidcare-101.firebasestorage.app",
  messagingSenderId: "680548870359",
  appId: "1:680548870359:web:6cb4c7e91c455e90226892"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };