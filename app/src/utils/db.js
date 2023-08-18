import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
const dotenv = require("dotenv");
dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.env_apikey,
  authDomain: process.env.env_authdomain,
  databaseURL: process.env.env_databaseURL,
  projectId: process.env.env_projectId,
  storageBucket: process.env.env_storageBucket,
  messagingSenderId: process.env.env_messagingSenderId,
  appId: process.env.env_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
