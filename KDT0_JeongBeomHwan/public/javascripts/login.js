import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtnEl = document.querySelector(".login-btn");

if (loginBtnEl) {
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
        console.log("error", credential, errorCode);
      });
  };
}
