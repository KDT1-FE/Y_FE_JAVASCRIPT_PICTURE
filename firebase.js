import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getFirestore, collection } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';

const { APIKEY } = process.env;

const firebaseConfig = {
  apiKey: `${APIKEY}`,
  authDomain: 'member-management-a0113.firebaseapp.com',
  projectId: 'member-management-a0113',
  storageBucket: 'member-management-a0113.appspot.com',
  messagingSenderId: '945069285797',
  appId: '1:945069285797:web:a1a985ee443e896ba5c84c',
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const colRef = collection(db, 'characters');

export const storage = getStorage();

export { getDocs, getDoc, addDoc, deleteDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
export { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';
