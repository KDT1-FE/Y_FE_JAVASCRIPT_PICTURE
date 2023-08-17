import render from './render.js';
import { db, getData } from '../../firebase/firebase.js';

const $form = document.getElementById('modal-form');
const $modal = document.getElementById('modal');
const $backDrop = document.getElementById('modal-backdrop');
const $body = document.body;
const [$name, $divisions, $email, $password, $contact, $imageFile] = $form;
const $logout = document.getElementById('logout');

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

$form.addEventListener('input', e => {
  activateModalButton();
});

document.getElementById('modal-exit').addEventListener('click', e => {
  toggleModal();
});

document.getElementById('add-button').addEventListener('click', e => {
  toggleModal();
});

document.getElementById('user').addEventListener('click', e => {
  $logout.classList.toggle('hidden');
});

/* ------------------------------------ - ----------------------------------- */

window.addEventListener('DOMContentLoaded', async e => {
  await getData(state.members);

  render(state.members);
});
