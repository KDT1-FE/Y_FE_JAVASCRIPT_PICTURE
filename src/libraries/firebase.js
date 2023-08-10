// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYi44zD9oTGUmSpYOf_SWD8EpsLmP2jSg",
  authDomain: "ems-js-222d0.firebaseapp.com",
  projectId: "ems-js-222d0",
  storageBucket: "ems-js-222d0.appspot.com",
  messagingSenderId: "430979056919",
  appId: "1:430979056919:web:371ea2e1530d10c6456352",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
