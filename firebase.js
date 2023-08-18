import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDZNtKbE6q5-ROZ6rnCa14zCA_xnD15naI",
  authDomain: "manage-workes.firebaseapp.com",
  projectId: "manage-workes",
  storageBucket: "manage-workes.appspot.com",
  messagingSenderId: "594002563664",
  appId: "1:594002563664:web:3d620f0a7c69421300b755",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
