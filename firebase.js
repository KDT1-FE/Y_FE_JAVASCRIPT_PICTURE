import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getFirestore, collection } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';

const { APIKEY } = process.env;
const { AUTHDOMAIN } = process.env;
const { STORAGEBUCKET } = process.env;
const { MESSAGINGSENDERID } = process.env;
const { APPID } = process.env;

const firebaseConfig = {
  apiKey: `${APIKEY}`,
  authDomain: `${AUTHDOMAIN}`,
  projectId: 'member-management-a0113',
  storageBucket: `${STORAGEBUCKET}`,
  messagingSenderId: `${MESSAGINGSENDERID}`,
  appId: `${APPID}`,
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const colRef = collection(db, 'characters');

export const storage = getStorage();

export {
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
export {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';
