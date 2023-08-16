import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from 'firebase/auth';
import inputFocusEvent from './basic.js';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 로그인 실행
const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      authState(user);
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error.message[error.code]);
    });
};

// 유저 로그인 정보 로컬스토리지에 저장
const authState =
  (auth,
  (user) => {
    if (user) {
      const userJSON = JSON.stringify({
        uid: user.uid,
      });
      localStorage.setItem('user', userJSON);
    }
  });

// 로그인 버튼 클릭 이벤트
function loginConfirm() {
  const loginButton = document.getElementById('login-confirm');
  loginButton.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return login(email, password);
      })
      .catch((error) => {
        console.log(error.message[error.code]);
      });
  });
}

loginConfirm();

inputFocusEvent();
