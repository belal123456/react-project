// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC3NslK_360fSJvf2zEL2FWyr2NS7CaWY",
  authDomain: "react-blog-project-ea597.firebaseapp.com",
  projectId: "react-blog-project-ea597",
  storageBucket: "react-blog-project-ea597.appspot.com",
  messagingSenderId: "1073988586809",
  appId: "1:1073988586809:web:b4ce48ad7d5832321eace8",
  measurementId: "G-KZ2PYVZ1T8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
