import { doc, writeBatch } from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

export const phoneType = num => {
  return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
};

// Storage에서 사진 삭제
export const deleteData = photoUrl => {
  const desertRef = ref(storage, photoUrl);
  deleteObject(desertRef);
};

const imgRemoveBtn = document.querySelector('.img-remove-btn');
const imgTextInput = document.getElementById('imgTextInput');
const avatarImg = document.getElementById('avatarImg');
export let preAvatarImg = '';

// input 파일이 바뀌면 파이어베이스 Storage에 저장하고 화면에 표시
export const changeAvatar = coustomerId => {
  const file = document.getElementById('profilePic').files[0];
  const storageRef = ref(storage, 'avatar/' + Math.random() + file.name);
  // storage에 사진 저장
  uploadBytes(storageRef, file).then(() => {
    // storage에 저장된 사진 url 가져오기
    getDownloadURL(storageRef).then(async url => {
      // 프로필 이미지 url input에 저장
      preAvatarImg = imgTextInput.value;
      imgTextInput.value = url;

      // 프로필 이미지 변경
      document.getElementById('avatarImg').src = url;

      // 프로필 이미지 삭제 버튼 표시
      imgRemoveBtn.classList.remove('hidden');
    });
  });
};

// 프로필 이미지 삭제 기능 ('삭제하기' 버튼)
export const removeAvatar = () => {
  if (imgTextInput.value) {
    imgTextInput.value = '';
    avatarImg.src = '';
    imgRemoveBtn.classList.add('hidden');
  }
};

// input 태그에서 엔터 눌러도 submit 막기
export const preventEnter = inputs => {
  for (const input of inputs) {
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });
  }
};
