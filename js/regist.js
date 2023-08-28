import {
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';
import { db } from './firebase.js';
import { changeProfile, removeProfile, preventEnter } from './util.js';

// input 파일이 바뀌면 firebase Storage에 저장하고 화면에 표시
changeProfile();

// 완료 버튼 클릭 시 firestore에 직원 정보 저장
const registForm = document.querySelector('.regist-form');
registForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    await addDoc(collection(db, 'users'), {
      profile: registForm.elements[2].value,
      name: registForm.elements[3].value,
      email: registForm.elements[4].value,
      phone: registForm.elements[5].value,
    });
    location.href = '/';
  } catch (e) {
    console.error('Error adding document: ', e);
  }
});

// 프로필 이미지 삭제
removeProfile();

// input 태그에서 엔터 눌러도 submit 막기
preventEnter();
