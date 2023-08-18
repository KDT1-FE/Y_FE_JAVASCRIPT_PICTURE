import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from 'firebase/auth';
import {
  doc,
  onSnapshot,
  getFirestore,
  collection,
  query,
  setDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import inputFocusEvent from './basic.js';
import { loading, hideLoading } from './loading.js';
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
const db = getFirestore(app);

// 로그인 실행
const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      loading();
      uploadNew();
      setTimeout(() => {
        const user = userCredential.user;
        authState(user);
        hideLoading();
        window.location.href = '/';
      }, 1000);
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') alert('이메일을 입력해 주세요');
      else if (error.code === 'auth/missing-password')
        alert('비밀번호를 입력해 주세요');
      else if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      )
        alert('이메일이나 비밀번호가 올바르지 않습니다.');
      else alert('정의되지 않은 오류입니다. 관리자에 문의해 주세요.');
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
        login(email, password);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

// 새소식 받아오기
function uploadNew() {
  const q = query(collection(db, 'employee'));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const data = change.doc._document.data.value.mapValue.fields;
      const name = data.name.stringValue;
      const email = data.email.stringValue;
      const employeeUid = data.uid.stringValue;
      const date = data.date.timestampValue;
      // 추가된 문서 + 새로 추가한 문서
      if (change.type === 'added') {
        const type = 'added';
        uploadNotice(name, email, employeeUid, type, date);
      }
      // 문서가 수정됨
      if (change.type === 'modified') {
        const type = 'modified';
        uploadNotice(name, email, employeeUid, type, date);
      }
      // 문서가 삭제됨
      if (change.type === 'removed') {
        const type = 'removed';
        uploadNotice(name, email, employeeUid, type, date);
      }
    });
  });
}

// 새소식 업로드
async function uploadNotice(name, email, employeeUid, type, date) {
  const noticeDataJSON = localStorage.getItem(employeeUid + type);
  const noticeData = JSON.parse(noticeDataJSON);
  if (noticeData && type === 'added') {
  } else {
    const noticeJSON = JSON.stringify({
      email: email,
      date: date,
      name: name,
      division: type,
      uid: employeeUid,
      check: true,
    });
    localStorage.setItem(`${employeeUid}_${type}`, noticeJSON);
  }
}

loginConfirm();
inputFocusEvent();
