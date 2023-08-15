import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXjktja_jwgeu_cQ9ajtG-vtP5nGHZzjo',
  authDomain: 'cms-solution-86408.firebaseapp.com',
  projectId: 'cms-solution-86408',
  storageBucket: 'cms-solution-86408.appspot.com',
  messagingSenderId: '714447279928',
  appId: '1:714447279928:web:219c3429fc0f4c5ed213cd',
  measurementId: 'G-E4Q9HYTK7N',
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
      const token = user
        .getIdToken()
        .then((tokenObject) => {
          const token = tokenObject.accessToken;
          return token;
        })
        .catch((error) => {
          console.log('토큰 가져오기 오류:', error);
        });
      const userJSON = JSON.stringify({
        uid: user.uid,
        email: user.email,
        token: token,
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
