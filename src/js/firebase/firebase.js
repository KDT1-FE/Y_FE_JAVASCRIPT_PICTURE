import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';

import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js';

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCy7QYDgKpkn-0eH42AmxAki6u4DH1oGZ0',
  authDomain: 'members-dev-d3512.firebaseapp.com',
  projectId: 'members-dev-d3512',
  storageBucket: 'members-dev-d3512.appspot.com',
  messagingSenderId: '277572932709',
  appId: '1:277572932709:web:070862b87f629ee329a28c',
  measurementId: 'G-3GBJM8LJ01',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* ------------------------------------ - ----------------------------------- */

const auth = getAuth();

const signinSubmit = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      location.replace('main.html');

      // ...
    })
    .catch(error => {
      alert(['email, password를 다시 한번 확인해주세요']);
    });
};

/* ------------------------------------ - ----------------------------------- */
const db = getFirestore(app);

const getData = async members => {
  const snapshot = await getDocs(collection(db, 'members'));

  await snapshot.forEach(doc => {
    const data = doc.data();

    members.unshift(data);
  });
};

const addData = async (person, email, contact, division, profileUrl) => {
  await setDoc(doc(db, 'members', email), {
    person: person,
    email: email,
    contact: contact,
    division: division,
    profileUrl: profileUrl,
  });
};

const deleteData = async email => {
  await deleteDoc(doc(db, 'members', email));
};

/* ------------------------------------ - ----------------------------------- */

const storage = getStorage(app);

const uploadImage = async (email, file) => {
  const storageRef = ref(storage, `${email}.png`);

  await uploadBytes(storageRef, file).then(snapshot => {
    console.log('uploaded successful', 'to', email);
  });

  return await getDownloadURL(storageRef);
};

const deleteImage = async email => {
  const desertRef = ref(storage, `${email}.png`);

  await deleteObject(desertRef);
};

export { auth, signinSubmit, getData, addData, deleteData, uploadImage, deleteImage };
