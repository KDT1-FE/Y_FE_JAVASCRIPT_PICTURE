// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDiHT2Ps0faE1rGWSDVj5wI9gUjzYubCdQ',
    authDomain: 'fcjsspa.firebaseapp.com',
    databaseURL:
        'https://fcjsspa-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'fcjsspa',
    storageBucket: 'fcjsspa.appspot.com',
    messagingSenderId: '381168199169',
    appId: '1:381168199169:web:3d03879e113bcfa3750200',
    measurementId: 'G-CTPG9J3C0Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
