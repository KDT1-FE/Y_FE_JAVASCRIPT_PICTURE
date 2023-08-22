import {
  doc,
  getDoc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';
import { db } from './firebase.js';
import { changeProfile, removeProfile, preventEnter } from './util.js';

const url = new URL(window.location);
const urlParams = url.searchParams;
const userID = urlParams.get('id');

const profileImg = document.getElementById('profileImg');
const imgTextInput = document.getElementById('imgTextInput');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');

// 페이지 로드 시 직원 정보 표시
window.onload = async () => {
  // 직원 정보 조회
  const docRef = doc(db, 'users', userID);
  await getDoc(docRef).then((docSnap) => {
    // 스켈레톤 레이아웃 삭제
    document.querySelectorAll('.skeleton').forEach((skeleton) => {
      skeleton.classList.remove('skeleton');
    });
    // 값이 존재하면 직원 정보 표시
    if (docSnap.exists()) {
      profileImg.src = docSnap.data().profile;
      imgTextInput.value = docSnap.data().profile;
      nameInput.value = docSnap.data().name;
      emailInput.value = docSnap.data().email;
      phoneInput.value = docSnap.data().phone;
    } else {
      alert('존재하지 않는 직원입니다.');
      location.href = '/';
    }
  });
};

// input 파일이 바뀌면 firebase Storage에 저장하고 화면에 표시
changeProfile(userID);

const modifyBtn = document.querySelector('.modify-btn');
const imgRemoveBtn = document.querySelector('.img-remove-btn');

// 수정관련 버튼 토글 함수
const toggleModifyBtn = () => {
  // input 태그 입력 가능/불가능
  document.querySelectorAll('.modify-input').forEach((i) => {
    if (i.disabled) {
      i.disabled = false;
    } else {
      i.disabled = true;
    }
  });
  // '정보 수정' 버튼 숨기기/보여주기 토글
  modifyBtn.classList.toggle('hidden');
  // 사진 url 값이 있다면, '삭제하기' 버튼 숨기기/보여주기 토글
  if (imgTextInput.value) {
    document.querySelector('.profile-label').classList.toggle('hidden');
    imgRemoveBtn.classList.toggle('hidden');
  }
  // '취소하기','수정하기' 버튼 숨기기/보여주기 토글
  document.querySelectorAll('.modifying').forEach((i) => {
    i.classList.toggle('hidden');
  });
};

// '수정하기' 버튼 클릭 시 정보 수정할 수 있도록 변경
modifyBtn.addEventListener('click', () => {
  toggleModifyBtn();
});

// '취소하기' 버튼 클릭 시 정보 수정할 수 없도록 변경
document.querySelector('.cancel-btn').addEventListener('click', (e) => {
  e.preventDefault();
  toggleModifyBtn();
  imgRemoveBtn.classList.add('hidden');
});

// 프로필 이미지 삭제
removeProfile();

// 수정 완료 버튼 클릭 시 firebase 데이터 수정 요청
document.querySelector('.submit-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  await setDoc(doc(db, 'users', userID), {
    profile: imgTextInput.value,
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  }).then(() => {
    location.href = '/';
  });
});

// input 태그에서 엔터 눌러도 submit 막기
preventEnter();
