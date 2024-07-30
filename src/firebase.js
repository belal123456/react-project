// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "./auth"; // Import getAuth for authentication

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

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
