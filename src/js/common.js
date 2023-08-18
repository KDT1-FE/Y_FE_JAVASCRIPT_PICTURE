import '../../assets/image/ic_top_gray.png';
import '../../assets/image/logo.png';
import '../../assets/image/no-image.png';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  currentUser,
  onAuthStateChanged,
  signOut,
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
  deleteDoc,
} from 'firebase/firestore';

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
let userUid;

// 메뉴 열고 닫기
const menuButton = document.querySelector('.nav__control a');
const menuWrap = document.querySelector('.nav__wrap');
menuButton.addEventListener('click', (e) => {
  e.preventDefault();
  menuWrap.parentElement.classList.toggle('close');
});

// 메뉴 스크롤 따라다니기
//window.addEventListener('scroll', () => {
//  menuWrap.style.transform =
//    'translateY(' + document.documentElement.scrollTop + 'px)';
//});

// 메뉴 브라우저 사이즈에 맞게 열고 닫기
function menuClose() {
  const BrowserWidth = window.innerWidth;
  if (BrowserWidth <= 1200) {
    menuWrap.parentElement.classList.add('close');
    const nav = document.querySelector('.nav');
    nav.classList.add('mobile');
  }
  if (BrowserWidth >= 1400) menuWrap.parentElement.classList.remove('close');
}
menuClose();

// 모바일 메뉴 클릭
const headerMenu = document.querySelector('.header__menu');
headerMenu.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.style.display = 'block';
  nav.classList.remove('close');
});

const navMenu = document.querySelector('.nav__control');
navMenu.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.style.display = 'none';
});
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

// 페이지 이동 시 로컬 스토리지에서 유저 정보 및 토큰 가져와 비교
window.addEventListener('load', () => {
  const userDataJSON = localStorage.getItem('user');
  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    //console.log(userData);

    onAuthStateChanged(auth, (user) => {
      // 헤더 계정 이름 설정
      if (user) {
        userUid = user.uid;
        const displayName = user.displayName;
        const dropdownName = document.querySelector('.dropdown--account span');
        dropdownName.innerHTML = displayName;
      }
      // 유저 정보 및 토큰이 유효한지 확인
      if (user && userData.uid === user.uid) {
        // 인증 상태 유지
        //console.log('User is authenticated:', user.email);
      } else {
        // 인증 상태가 유효하지 않음
        //console.log('User is not authenticated or token expired.');
        // 로컬 스토리지의 유저 정보 삭제
        localStorage.removeItem('user');
        window.location.href = '/login.html';
      }
    });
  } else {
    // 로컬 스토리지에 유저 정보가 없음
    //console.log('No user data in local storage.');
    window.location.href = '/login.html';
  }
});

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

function logoutConfirm() {
  const logoutButton = document.getElementById('logout-confirm');
  logoutButton.addEventListener('click', async () => {
    logout();
  });
}
logoutConfirm();

// 새소식 받아오기
function uploadNew() {
  const q = query(collection(db, 'employee'));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const data = change.doc._document.data.value.mapValue.fields;
      const name = data.name.stringValue;
      const email = data.email.stringValue;
      const employeeUid = data.uid.stringValue;

      // 추가된 문서 + 새로 추가한 문서
      if (change.type === 'added') {
        const type = 'added';
        uploadNotice(name, email, employeeUid, type);
      }
      // 문서가 수정됨
      if (change.type === 'modified') {
        const type = 'modified';
        uploadNotice(name, email, employeeUid, type);
      }
      if (change.type === 'removed') {
        // 문서가 삭제됨
        const type = 'removed';
        uploadNotice(name, email, employeeUid, type);
      }
    });
  });
}

// 새소식 업로드
async function uploadNotice(name, email, employeeUid, type) {
  const date = new Date();
  const noticeDataJSON = localStorage.getItem(`${employeeUid}_${type}`);
  const noticeData = JSON.parse(noticeDataJSON);
  if (noticeData && type === 'added') {
  } else {
    const noticeJSON = JSON.stringify({
      email: email,
      date: date,
      name: name,
      division: type,
      uid: employeeUid,
      check: false,
    });
    localStorage.setItem(`${employeeUid}_${type}`, noticeJSON);
  }
}

uploadNew();

function noticeIcon() {
  let checkResult = 0;
  const localDataAll = Object.keys(localStorage);
  for (let i = 0; i < localDataAll.length; i++) {
    if (localDataAll[i] === 'user') {
      localDataAll.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < localDataAll.length; i++) {
    const noticeData = localStorage.getItem(localDataAll[i]);
    const notice = JSON.parse(noticeData);
    if (!notice.check) checkResult++;
  }
  const noticeAlert = document.querySelector('.header__alert');
  if (checkResult === 0) noticeAlert.style.display = 'none';
  noticeAlert.innerHTML = checkResult;
}

noticeIcon();
