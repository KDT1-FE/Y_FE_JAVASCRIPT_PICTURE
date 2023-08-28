import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  changeAvatar,
  deleteData,
  emailCheck,
  phoneCheck,
  preAvatarImg,
  preventEnter,
  removeAvatar,
} from './util';

const url = new URL(window.location);
const urlParams = url.searchParams;
const coustomerId = urlParams.get('id');

const avatarImg = document.getElementById('avatarImg');
const imgTextInput = document.getElementById('imgTextInput');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const gradeInput = document.getElementById('gradeInput');

// 페이지 로드 시 고객 정보 표시
window.onload = async () => {
  // 고객 정보 조회
  const docRef = doc(db, 'customers', coustomerId);
  const docSnap = await getDoc(docRef);
  // 스켈레톤 레이아웃 삭제
  document.querySelectorAll('.skeleton').forEach(skeleton => {
    skeleton.classList.remove('skeleton');
  });
  // 값이 존재하면 고객 정보 표시
  const { avatar, name, email, phone, grade } = docSnap.data();
  if (docSnap.exists()) {
    avatarImg.src = avatar;
    imgTextInput.value = avatar;
    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
    gradeInput.value = grade;
  } else {
    alert('존재하지 않는 고객입니다.');
    location.href = '/';
  }
};

// input 파일이 바뀌면 파이어베이스 Storage에 저장하고 화면에 표시
const imageInputEl = document.getElementById('profilePic');
imageInputEl.addEventListener('change', () => changeAvatar(coustomerId));

const modifyBtn = document.querySelector('.modify');
const imgRemoveBtn = document.querySelector('.img-remove-btn');

// 수정관련 버튼 토글 함수
const toggleModifyBtn = () => {
  // input 태그 입력 가능/불가능
  document.querySelectorAll('.modify-input').forEach(input => {
    input.disabled ? (input.disabled = false) : (input.disabled = true);
  });
  // '정보 수정' 버튼 숨기기/보여주기 토글
  modifyBtn.classList.toggle('hidden');
  // 만약 사진 url 값이 있다면 이미지 '삭제하기' 버튼 숨기기/보여주기 토글
  if (imgTextInput.value) {
    document.querySelector('.avatar-label').classList.toggle('hidden');
    imgRemoveBtn.classList.toggle('hidden');
  }
  // '취소하기','수정하기' 버튼 숨기기/보여주기 토글
  document.querySelectorAll('.modifying').forEach(el => {
    el.classList.toggle('hidden');
  });
};

// '수정하기' 버튼 클릭 시 정보 수정할 수 있도록 변경
modifyBtn.addEventListener('click', toggleModifyBtn);

// 프로필 이미지 삭제 기능 ('삭제하기' 버튼)
imgRemoveBtn.addEventListener('click', e => {
  e.preventDefault();
  removeAvatar();
});

// 수정 완료 버튼 클릭 시 파이어베이스 데이터 수정 요청
document.querySelector('.submit-btn').addEventListener('click', async e => {
  e.preventDefault();
  let emailCheckResult = emailCheck(emailInput.value);
  let phoneCheckResult = phoneCheck(phoneInput.value);
  if (emailCheckResult && phoneCheckResult) {
    if (preAvatarImg) {
      deleteData(preAvatarImg);
    }
    await setDoc(doc(db, 'customers', coustomerId), {
      avatar: imgTextInput.value,
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      grade: gradeInput.value,
    });
    location.href = '/';
  } else if (!emailCheckResult) {
    alert('이메일을 올바르게 입력해주세요.');
  } else if (!phoneCheckResult) {
    alert('휴대폰 번호를 올바르게 입력해주세요.');
  }
});

// input 태그에서 엔터 눌러도 submit 막기
const textInputs = document.querySelectorAll('.regist-text-input');
preventEnter(textInputs);
