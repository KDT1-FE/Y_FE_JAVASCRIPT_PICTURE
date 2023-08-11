import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCUTznoBN5hZJ1Pf1xWlKveKdLZiRhSeNA',
  authDomain: 'fastcampus01-20d03.firebaseapp.com',
  projectId: 'fastcampus01-20d03',
  storageBucket: 'fastcampus01-20d03.appspot.com',
  messagingSenderId: '1015721483610',
  appId: '1:1015721483610:web:4e84fd8b1dc42c09456763',
  measurementId: 'G-J8G8NMVC2K',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage();
