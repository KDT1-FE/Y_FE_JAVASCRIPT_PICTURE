import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9fbsD-hZaGNcRnVuoKJJ_nFagysrdm6E",
  authDomain: "employeemanagement-9fd1f.firebaseapp.com",
  databaseURL:
    "https://employeemanagement-9fd1f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "employeemanagement-9fd1f",
  storageBucket: "employeemanagement-9fd1f.appspot.com",
  messagingSenderId: "30056874245",
  appId: "1:30056874245:web:6206f3abd5d7ef9864376c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
