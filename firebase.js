// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbIZHxlYJfqnLaXxXUpAUsPY_k6C3CvJY",
  authDomain: "js-project-b9579.firebaseapp.com",
  projectId: "js-project-b9579",
  storageBucket: "js-project-b9579.appspot.com",
  messagingSenderId: "364495315069",
  appId: "1:364495315069:web:85a6cb78f642b054d35114",
  measurementId: "G-QNNZXRNBFJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleAuthProvider, analytics };