import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from 'firebase/auth';
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
let auth = getAuth(app);

import inputFocusEvent from './basic.js';
inputFocusEvent();

// 비밀번호 체크
function passwordCheck(password, passwordConfirm, name) {
  return new Promise(function (resolve, reject) {
    if (!name) reject('이름을 입력해 주세요.');
    if (passwordConfirm) {
      if (password === passwordConfirm) resolve();
      else reject('비밀번호와 비밀번호 확인의 값이 다릅니다.');
    } else {
      reject('비밀번호 확인의 값을 입력해 주세요.');
    }
  });
}

async function join(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      await updateProfile(auth.currentUser, { displayName: name });
      window.location.href = '/login.html';
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use')
        alert('이미 사용 중인 이메일 입니다.');
      else if (error.code === 'auth/weak-password')
        alert('비밀번호는 6자 이상으로 기입해 주세요.');
      else if (error.code === 'auth/missing-email')
        alert('이메일을 입력해 주세요.');
      else if (error.code === 'auth/missing-password')
        alert('비밀번호를 입력해 주세요.');
      else alert('정의되지 않은 오류입니다. 관리자에 문의해 주세요.');

      console.log(error);
    });
}

// 로그인 버튼 클릭 이벤트
function joinConfirm() {
  const joinButton = document.getElementById('join-confirm');
  joinButton.addEventListener('click', () => {
    const name = document.getElementById('join-name').value;
    const email = document.getElementById('join-email').value;
    const password = document.getElementById('join-password').value;
    const passwordConfirm = document.getElementById(
      'join-password-confirm',
    ).value;
    passwordCheck(password, passwordConfirm, name)
      .then(() => {
        join(name, email, password);
      })
      .catch((error) => {
        alert(error);
      });
  });
}

joinConfirm();
