import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApnHD_y14j6Lharwb0V0VrZMNtI3z4Do8",
    authDomain: "rapidcare-101.firebaseapp.com",
    projectId: "rapidcare-101",
    storageBucket: "rapidcare-101.firebasestorage.app",
    messagingSenderId: "680548870359",
    appId: "1:680548870359:web:6cb4c7e91c455e90226892"
};  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {};