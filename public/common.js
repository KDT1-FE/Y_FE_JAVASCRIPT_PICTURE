const firebaseConfig = {
    apiKey: "AIzaSyBRDdAmcnRV3_Ui_Md_vhbyp9-9-eXqzbw",
    authDomain: "javascript-picture.firebaseapp.com",
    projectId: "javascript-picture",
    storageBucket: "javascript-picture.appspot.com",
    messagingSenderId: "487659103783",
    appId: "1:487659103783:web:e98479de1137818dfa9002",
    measurementId: "G-0RSTQFT7N8"
  };


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig) 


const db = firebase.firestore();
const storage = firebase.storage();