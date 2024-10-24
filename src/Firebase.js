// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9nYOojqVe4YyacTq3ZEOHRzZUhiMKDCQ",
  authDomain: "langlingo-4d3d9.firebaseapp.com",
  projectId: "langlingo-4d3d9",
  storageBucket: "langlingo-4d3d9.appspot.com",
  messagingSenderId: "100350866307",
  appId: "1:100350866307:web:ed2813df8d30a54b04bcb6",
  measurementId: "G-882P4VQJ3P"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
