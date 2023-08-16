import '../../assets/image/ic_top_gray.png';
import '../../assets/image/logo.png';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  currentUser,
  onAuthStateChanged,
  signOut,
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
const auth = getAuth(app);

// 메뉴 열고 닫기
const menuButton = document.querySelector('.nav__control a');
const menuWrap = document.querySelector('.nav__wrap');
menuButton.addEventListener('click', (e) => {
  e.preventDefault();
  menuWrap.parentElement.classList.toggle('close');
});

// 메뉴 스크롤 따라다니기
window.addEventListener('scroll', () => {
  menuWrap.style.transform =
    'translateY(' + document.documentElement.scrollTop + 'px)';
});

// 메뉴 브라우저 사이즈에 맞게 열고 닫기
function menuClose() {
  const BrowserWidth = window.innerWidth;
  if (BrowserWidth <= 1200) menuWrap.parentElement.classList.add('close');
  if (BrowserWidth >= 1400) menuWrap.parentElement.classList.remove('close');
}
menuClose();

// 브라우저 사이즈 실시간 감지 및 메뉴 축소/확대
window.addEventListener('resize', () => {
  menuClose();
});

// 드롭다운 열고 닫기
const dropDown = document.querySelectorAll('.dropdown');
for (let i = 0; i < dropDown.length; i++) {
  const dropWrap = dropDown[i];
  const dropClick = dropWrap.lastElementChild.firstElementChild; // dropdown__display

  dropClick.addEventListener('click', () => {
    dropWrap.classList.toggle('dropdown--open');
  });
  document.addEventListener('mouseup', (e) => {
    if (!dropWrap.contains(e.target))
      dropWrap.classList.remove('dropdown--open');
  });
}

// 탑버튼 처음 위치 잡기
const scrollTop = document.querySelector('.scrolltop');
function scrollTopTransition() {
  const TopHeight =
    window.innerHeight + document.documentElement.scrollTop - 70;
  scrollTop.style.transform = 'translateY(' + TopHeight + 'px)';
}
scrollTopTransition();

// 탑버튼 스크롤 따라다니기
window.addEventListener('scroll', () => {
  scrollTopTransition();
});

// 탑버튼 윈도우 스크롤탑
scrollTop.firstElementChild.addEventListener('click', () => {
  const BrowserTop = document.documentElement.scrollTop;
  if (BrowserTop != 0) {
    window.scrollTo(0, 0);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// 페이지 이동 시 로컬 스토리지에서 유저 정보 및 토큰 가져와 비교
window.addEventListener('load', () => {
  const userDataJSON = localStorage.getItem('user');
  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    console.log(userData);

    onAuthStateChanged(auth, (user) => {
      // 유저 정보 및 토큰이 유효한지 확인
      if (user && userData.uid === user.uid) {
        // 인증 상태 유지
        console.log('User is authenticated:', user.email);
      } else {
        // 인증 상태가 유효하지 않음
        console.log('User is not authenticated or token expired.');
        // 로컬 스토리지의 유저 정보 삭제
        localStorage.removeItem('user');
        window.location.href = '/login.html';
      }
    });
  } else {
    // 로컬 스토리지에 유저 정보가 없음
    console.log('No user data in local storage.');
    window.location.href = '/login.html';
  }
});

const logout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem('user');
    window.location.href = '/';
  } catch (error) {
    console.log(error.message[error.code]);
  }
};

function logoutConfirm() {
  const logoutButton = document.getElementById('logout-confirm');
  logoutButton.addEventListener('click', async () => {
    console.log('click');
    logout();
  });
}
logoutConfirm();
