// 파이어베이스 초기 SDK 설정
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/8.6.5/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADGhVmnDZVtlapxpjREmWSZYW-AIgW8kw",
  authDomain: "lck-players.firebaseapp.com",
  projectId: "lck-players",
  storageBucket: "lck-players.appspot.com",
  messagingSenderId: "567812302039",
  appId: "1:567812302039:web:de19c23150be604db37c92",
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = firebase.storage(app);
const db = firebase.getFirestore(app);

export default app;
