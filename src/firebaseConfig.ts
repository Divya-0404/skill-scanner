// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN50xHXUZOBD-Aji3BvUfDBFffGowpnbA",
  authDomain: "skill-scanner-1322-2074a.firebaseapp.com",
  projectId: "skill-scanner-1322-2074a",
  storageBucket: "skill-scanner-1322-2074a.firebasestorage.app",
  messagingSenderId: "434445073990",
  appId: "1:434445073990:web:bf580116a51a9d29ea1447",
  measurementId: "G-5D8ZTQ51XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };