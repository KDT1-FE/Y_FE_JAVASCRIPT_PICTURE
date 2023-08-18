import render from './render.js';
import { getAllMembers, addData, deleteData, uploadImage, deleteImage } from '../../firebase/firebase.js';

const $form = document.getElementById('modal-form');
const $modal = document.getElementById('modal');
const $backDrop = document.getElementById('modal-backdrop');
const $body = document.body;
const [$name, $divisions, $email, $password, $contact, $imageFile] = $form;
const $logout = document.getElementById('logout');
const $allCheckbox = document.getElementById('all-checkbox');
const $memberList = document.getElementById('member-list');

const state = {
  isSignin: true,
  members: [
    // {
    //   person: '남궁종민',
    //   email: 'vbghdl@naver.com',
    //   contact: '010-6428-6518',
    //   division: '품질관리부',
    //   profileUrl: 'https://newsimg.sedaily.com/2021/12/09/22V85NTJGY_1.jpg',
    // },
  ],
};
/* -------------------------------- Function -------------------------------- */
const activateModalButton = () => {
  document.getElementById('modal-button').disabled =
    !$name.value || !$divisions.value || !$email.value || !$password.value || !$contact.value || !$imageFile.value;
};

const toggleModal = () => {
  $modal.open = !$modal.open;
  $backDrop.classList.toggle('hidden');
  $body.classList.toggle('overflow-hidden');
};

/* ------------------------------------ Event ----------------------------------- */

// 검색 바 포커스 시 placeholder 제거
document.getElementById('main-search').addEventListener('focus', e => {
  e.target.placeholder = '';
});

// 검색 바에서 포커스 아웃될 시 value 값이 있으면 유지 없으면 placeholder 생성
document.getElementById('main-search').addEventListener('blur', e => {
  if (e.target.value) return;

  e.target.placeholder = '이름 또는 이메일로 검색하기';
});

// input값을 다 채우면 submit button 활성화
$form.addEventListener('input', e => {
  activateModalButton();
});

// 임직원 등록 버튼 누르면 모달 열림
document.getElementById('add-button').addEventListener('click', e => {
  toggleModal();
});

// 모달 닫기 이벤트
document.getElementById('modal-exit').addEventListener('click', e => {
  toggleModal();
});

// 관리자님 < 클릭 시 로그아웃 버튼 활성화
document.getElementById('user').addEventListener('click', e => {
  $logout.classList.toggle('hidden');
});

// checkbox-all checked
$allCheckbox.addEventListener('click', e => {
  const $checkboxes = document.querySelectorAll('input[type=checkbox]');

  [...$checkboxes].forEach((checkbox, index) => {
    checkbox.checked = index === 0 ? checkbox.checked : !checkbox.checked;
  });
});

/* ------------------------------------ - ----------------------------------- */
// main page list redering
window.addEventListener('DOMContentLoaded', async e => {
  if (JSON.stringify(localStorage.getItem('isSignin')) === 'null') {
    location.replace('signin.html');
    return;
  }

  await getAllMembers(state.members);

  await render(state.members);
});

// modal submit 임직원 등록
$form.submit.addEventListener('click', async e => {
  e.preventDefault();

  const [person, division, email, password, contact, picture] = $form;
  // 사진 firebase 올리고 profileUrl 할당
  const profileUrl = await uploadImage(email.value, picture.files[0]);

  await addData(person.value, email.value, contact.value, division.value, profileUrl);

  location.replace('main.html');
});

// 임직원 삭제
document.getElementById('remove-button').addEventListener('click', e => {
  const $checkboxes = document.querySelectorAll('input[type=checkbox]');

  const removeTarget = [...$checkboxes].filter(checkbox => checkbox.checked).map(target => (target = target.name));

  const newMembers = state.members.filter(member => {
    return !removeTarget.includes(member.email);
  });
  state.members = newMembers;

  removeTarget.forEach(async target => {
    await deleteData(target);
    await deleteImage(target);
  });

  render(state.members);
});

// list click 이벤트위임
$memberList.addEventListener('click', e => {
  if (e.target.matches('input[type=checkbox]')) return;

  const member = e.target.closest('li');
  const email = member.querySelector('input').name;

  location.href = `detail.html?${email}`;
});

document.getElementById('logout').addEventListener('click', e => {
  localStorage.removeItem('isSignin');
  location.replace('signin.html');
});
