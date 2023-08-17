import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

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

  snapshot.forEach(doc => {
    const data = doc.data();

    members.unshift(data);
  });
};

export { auth, signinSubmit, db, getData };
