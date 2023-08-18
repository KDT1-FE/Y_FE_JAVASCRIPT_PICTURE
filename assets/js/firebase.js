// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaOxlvdJlsMMUZHDi325Y4SOUI2-wvO6U",
  authDomain: "myplant-21025.firebaseapp.com",
  projectId: "myplant-21025",
  storageBucket: "myplant-21025.appspot.com",
  messagingSenderId: "258161978128",
  appId: "1:258161978128:web:4228fd8ad30674909c5395",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// CRUD CONTROL FUNCTION

// SAVE
export const saveData = (image, name, date, waterTime, note) => {
  addDoc(collection(db, "myplants"), { image, name, date, waterTime, note });
};

// LIST
export const onGetData = (callback) =>
  onSnapshot(collection(db, "myplants"), callback);

// DELETE
export const deleteData = (id) => deleteDoc(doc(db, "myplants", id));

// EDIT
export const getData = (id) => getDoc(doc(db, "myplants", id));
export const updateData = (id, newInfo) =>
  updateDoc(doc(db, "myplants", id), newInfo);
//export const editData = (id) => (doc(db, 'myplants', id))
