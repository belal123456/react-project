// src/auth.js
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const signUp = async (email, password, username) => {
  try {
    // Create the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save the user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: user.email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

// Export 'auth' for use in other modules
export { auth };
