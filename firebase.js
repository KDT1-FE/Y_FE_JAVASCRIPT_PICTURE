

firebase.initializeApp({
  apiKey: 'AIzaSyCJLmKKFtwdZb0b-p_iB3uFQrnSDy1MofE',
  authDomain: 'adminpage-b1d7c.firebaseapp.com',
  projectId: 'adminpage-b1d7c',
  storageBucket: 'adminpage-b1d7c.appspot.com',
  messagingSenderId: '419603405921',
  appId: '1:419603405921:web:be975288296d3c49aede20',
});

const storage = firebase.storage();
const db = firebase.firestore();


export { storage,db };
