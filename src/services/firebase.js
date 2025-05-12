// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC75j05CGoGhuDDwBDlUMaG1uPo-RoSZtQ",
    authDomain: "student-management-syste-cba9a.firebaseapp.com",
    projectId: "student-management-syste-cba9a",
    storageBucket: "student-management-syste-cba9a.firebasestorage.app",
    messagingSenderId: "385433586872",
    appId: "1:385433586872:web:87c1babf63f020d6dff84d",
    measurementId: "G-65KM2FFQPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // it initializes Firebase Analytics so you can track usage, events, and user behaviour.

export { app, analytics };