import { initializeApp } from 'firebase/app';
import {
  getAuth,
  currentUser,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  getIdToken,
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
import { loading, hideLoading } from './loading.js';
loading();
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

// 유저정보 불러오기
onAuthStateChanged(auth, (user) => {
  dashboard(user);
  if (!user.emailVerified) emailButtonAdd(user);
});

// Date 변환
function formatDate(date) {
  const utcDate = new Date(date);
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');
  const hours = String(kstDate.getUTCHours()).padStart(2, '0');
  const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
}

// 대시보드 프로필 리스팅
function dashboard(user) {
  const displayName = document.getElementById('info-name');
  const email = document.getElementById('info-email');
  const emailVerified = document.getElementById('info-verified');
  const creationTime = document.getElementById('info-creation');
  const lastSignInTime = document.getElementById('info-lastsign');

  displayName.innerHTML = user.displayName;
  email.innerHTML = user.email;

  lastSignInTime.innerHTML = formatDate(user.metadata.lastSignInTime);
  creationTime.innerHTML = formatDate(user.metadata.creationTime);
  const span = document.createElement('span');
  if (user.emailVerified) {
    emailVerified.innerHTML = '이메일 인증 완료';
    span.classList.add('email-complete');
  } else {
    emailVerified.innerHTML = '이메일 인증 미완료';
    span.classList.add('email-incomplete');
  }
  emailVerified.appendChild(span);
  hideLoading();
}

// 이메일 인증 버튼 추가 (이메일 인증 미완료 시)
function emailButtonAdd(user) {
  const buttonContainer = document.querySelector('.info__button');
  const emailButton = document.createElement('button');
  emailButton.classList.add('button', 'button--lg', 'button--blue400');
  emailButton.id = 'button-verification';
  emailButton.innerHTML = '이메일 인증';
  buttonContainer.prepend(emailButton);

  // 이메일 인증 클릭 이벤트
  emailButton.addEventListener('click', () => {
    emailCheck(user);
  });
}

// 이메일 인증
function emailCheck(user) {
  if (user) {
    sendEmailVerification(user)
      .then((ok) => {
        alert('인증 이메일을 전송했습니다. 이메일을 확인해 주세요.');
      })
      .catch((error) => {
        alert('인증 이메일 전송에 실패하였습니다. 관리자에 문의해 주세요.');
      });
  }
}

let nowPageValue = 1;
// 로컬스토리지 모든값 받기
function dashboardLocal() {
  const localDataAll = Object.keys(localStorage);
  for (let i = 0; i < localDataAll.length; i++) {
    if (localDataAll[i] === 'user') {
      localDataAll.splice(i, 1);
      break;
    }
  }
  let noticeArr = [];
  for (let i = 0; i < localDataAll.length; i++) {
    const noticeData = localStorage.getItem(localDataAll[i]);
    const notice = JSON.parse(noticeData);
    noticeArr.push(notice);
  }

  noticeArr.sort((a, b) => {
    return a.date > b.date ? -1 : 1;
  });

  // 페이지네이션 함수 호출
  const { totalPage, SliceDocs } = getPagination(noticeArr, nowPageValue, 5);

  SliceDocs.forEach((doc) => {
    let type;
    if (doc.division === 'added') type = '등록';
    else if (doc.division === 'modified') type = '수정';
    else type = '삭제';
    const noticeArea = document.getElementById('notice-area');
    const noticeList = document.createElement('div');
    noticeList.classList.add('notice-list');
    noticeList.innerHTML = `${doc.name}(${doc.email})의 정보가 ${type}되었습니다.`;
    const span = document.createElement('span');
    span.innerHTML = formatDate(doc.date);
    noticeList.appendChild(span);
    noticeArea.appendChild(noticeList);
  });

  createNotice(noticeArr, totalPage);
}
dashboardLocal();
const logout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    localStorage.clear();
    window.location.href = '/login.html';
  } catch (error) {
    console.log(error);
  }
};

function logoutDash() {
  const logoutButton = document.getElementById('button-logout');
  logoutButton.addEventListener('click', async () => {
    logout();
  });
}
logoutDash();

// 페이지네이션 함수
function getPagination(docs, nowPage, limit) {
  const totalPage = Math.ceil(docs.length / limit);
  const SliceDocs = docs.slice((nowPage - 1) * limit, nowPage * limit);

  return { totalPage, SliceDocs };
}

// 무한스크롤
function createNotice(noticeArr, totalPage) {
  if (nowPageValue <= totalPage) {
    const target = document.querySelector('.dashboard-end');
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, option);

    observer.observe(target);

    function callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nowPageValue += 1;
          const { totalPage, SliceDocs } = getPagination(
            noticeArr,
            nowPageValue,
            5,
          );
          SliceDocs.forEach((doc) => {
            let type;
            if (doc.division === 'added') type = '등록';
            else if (doc.division === 'modified') type = '수정';
            else type = '삭제';
            const noticeArea = document.getElementById('notice-area');
            const noticeList = document.createElement('div');
            noticeList.classList.add('notice-list');
            noticeList.innerHTML = `${doc.name}(${doc.email})의 정보가 ${type}되었습니다.`;
            const span = document.createElement('span');
            span.innerHTML = formatDate(doc.date);
            noticeList.appendChild(span);
            noticeArea.appendChild(noticeList);
          });
        }
      });
    }
  }
}
