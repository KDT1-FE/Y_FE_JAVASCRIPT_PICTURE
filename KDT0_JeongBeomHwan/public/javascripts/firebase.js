// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// import { getAuth } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_R-euRNqGE2pQb_-lfUbNN6dfHILDE1s",
  authDomain: "profilebase-bm0729.firebaseapp.com",
  projectId: "profilebase-bm0729",
  storageBucket: "profilebase-bm0729.appspot.com",
  messagingSenderId: "912453268999",
  appId: "1:912453268999:web:2dd4a7cdca257e18e0dca2",
  measurementId: "G-LSMWWEY4DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtnEl = document.querySelector("button");

loginBtnEl.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(credential, token, user);
      localStorage.setItem("UserDisplayName", result.user.displayName);
      window.location.href = "../main.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
// const authProvider = new firebase.auth.GoogleAuthProvider();
// auth.signInWithPopup(authProvider);
