// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGR_UZwMq2MHDTv0zkXnRIrY_2xofY0SU",
  authDomain: "ems-js-92ed9.firebaseapp.com",
  projectId: "ems-js-92ed9",
  storageBucket: "ems-js-92ed9.appspot.com",
  messagingSenderId: "442248017451",
  appId: "1:442248017451:web:ce81e1764d8b942f661c6e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);