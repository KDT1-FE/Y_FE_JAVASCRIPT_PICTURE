import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { changeAvatar, preventEnter, removeAvatar } from './util';

// input 파일이 바뀌면 파이어베이스 Storage에 저장하고 화면에 표시
changeAvatar();

// 완료 버튼 누르면 firestore에 회원 정보 저장
const registForm = document.querySelector('.regist-form');
registForm.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    await addDoc(collection(db, 'customers'), {
      avatar: registForm.elements[2].value,
      name: registForm.elements[3].value,
      email: registForm.elements[4].value,
      phone: registForm.elements[5].value,
      grade: registForm.elements[6].value,
    });
    location.href = '/';
  } catch (e) {
    console.error('Error adding document: ', e);
  }
});

// 프로필 이미지 삭제 기능 ('삭제하기' 버튼)
removeAvatar();

// input 태그에서 엔터 눌러도 submit 막기
preventEnter();
