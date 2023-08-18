// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// require("dotenv").config();

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCmYgashP4otM7SS-FaAxSweG6i5NjEW4E',
  authDomain: 'photo-manager-89cc1.firebaseapp.com',
  projectId: 'photo-manager-89cc1',
  storageBucket: 'photo-manager-89cc1.appspot.com',
  messagingSenderId: '1068441294545',
  appId: '1:1068441294545:web:7395a5abd0e905781ad7f0',
  measurementId: 'G-7ZJXJ23REF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
