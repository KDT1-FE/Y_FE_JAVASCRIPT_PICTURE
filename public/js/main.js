

const firebaseConfig = {
    apiKey: "AIzaSyDHoGGqKwbHfwmX975Naxo22J3rTg75dNc",
    authDomain: "emsproject-68867.firebaseapp.com",
    projectId: "emsproject-68867",
    storageBucket: "emsproject-68867.appspot.com",
    messagingSenderId: "246851027648",
    appId: "1:246851027648:web:d3aaadc8e966b9e6502325",
    measurementId: "G-CMGYZN5PHM"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
