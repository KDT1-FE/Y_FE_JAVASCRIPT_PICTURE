import { debounce } from 'lodash';

const tBody = document.querySelector('tbody');
const searchInput = document.querySelector('.search-input');
const modal = document.querySelector('.modal');
const modalSelect = document.querySelector('.modal-select');
const modalConfirm = document.querySelector('.modal-confirm');
const selectCancel = document.querySelector('.select-cancel');
const confirmCancel = document.querySelector('.confirm-cancel');
const profileBtn = document.querySelector('.profile-btn');
const deleteBtn = document.querySelector('.delete-btn');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const modalDeleteSuccess = document.querySelector('.modal-delete-success');
let getItem = JSON.parse(localStorage.getItem('infos'));
let selectCancelEventListener = null;
let profileBtnEventListener = null;
let deleteBtnEventListener = null;
let yesBtnEventListener = null;
let noBtnEventListener = null;

// localStorage에서 정보들 가져와서 리스트 생성
if (getItem) {
  getItem.forEach((item) => {
    createStaffList(item);
  });
} else {
  const data = [
    {
      id: 1692252098267,
      name: '백종원',
      email: 'paik@gmail.com',
      phone: '01012341234',
      address: '서울특별시 서초구 서초동',
      imageUrl: 'https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/백종원.jpg'
    },
    {
      id: 1692268582359,
      name: '이무진',
      email: 'Moojin@gmail.com',
      phone: '01012345678',
      address: '경기도 고양시 일산구 풍동',
      imageUrl: 'https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/이무진.jpg'
    },
    {
      id: 1692268621555,
      name: '김종국',
      email: 'Jongkook@gmail.com',
      phone: '01045671234',
      address: '서울특별시 강남구 논현동',
      imageUrl: 'https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/김종국.png'
    },
    {
      id: 1692329664296,
      name: '해쉬',
      email: 'hash@gmail.com',
      phone: '01015448282',
      address: '서울특별시 노원구 상계로 182',
      imageUrl: 'https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/해쉬.jpg'
    },
    {
      id: 1692349779458,
      name: '홍길동',
      email: 'gildong@gmail.com',
      phone: '01012341234',
      address: '서울 강동구 동남로 733',
      imageUrl: 'https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/홍길동.png'
    }
  ];

  localStorage.setItem('infos', JSON.stringify(data));
  getItem = JSON.parse(localStorage.getItem('infos'));
  getItem.forEach((item) => {
    createStaffList(item);
  });
}

const searchStaff = debounce(() => {
  const listInner = document.getElementsByClassName('list-inner');

  for (let i = 0; i < listInner.length; i++) {
    if (listInner[i].cells[1].innerText.includes(searchInput.value)) {
      listInner[i].style.display = 'table-row';
    } else {
      listInner[i].style.display = 'none';
    }
  }
}, 500);

function createStaffList(item) {
  const tr = document.createElement('tr');
  const phone1 = item['phone'].slice(0, 3);
  const phone2 = item['phone'].slice(3, 7);
  const phone3 = item['phone'].slice(7);

  tr.innerHTML = `
  <td><img src="${item.imageUrl}" alt="사진이었던 것" /></td>
  <td>${item.name}</td>
  <td>${item.email}</td>
  <td>${phone1}-${phone2}-${phone3}</td>
  <td>${item.address}</td>
  `;

  tr.classList.add('list-inner');
  tBody.append(tr);

  tr.addEventListener('click', function () {
    const data = JSON.stringify(item);
    localStorage.setItem('lately-info', data);
    modal.classList.add('active');
    modalSelect.classList.add('active');

    if (selectCancelEventListener) selectCancel.removeEventListener('click', selectCancelEventListener);
    if (profileBtnEventListener) profileBtn.removeEventListener('click', profileBtnEventListener);
    if (deleteBtnEventListener) deleteBtn.removeEventListener('click', deleteBtnEventListener);
    if (yesBtnEventListener) yesBtn.removeEventListener('click', yesBtnEventListener);
    if (noBtnEventListener) noBtn.removeEventListener('click', noBtnEventListener);

    selectCancelEventListener = () => {
      modal.classList.remove('active');
    };

    profileBtnEventListener = () => {
      location.href = './profile.html';
    };

    deleteBtnEventListener = () => {
      modalSelect.classList.remove('active');
      modalConfirm.classList.add('active');
    };

    yesBtnEventListener = () => {
      getItem = getItem.filter((el) => el['id'] !== item['id']);
      const data = JSON.stringify(getItem);
      localStorage.setItem('infos', data);
      tr.remove();

      modalConfirm.classList.remove('active');
      modalDeleteSuccess.classList.add('active');

      setTimeout(() => {
        modalDeleteSuccess.classList.remove('active');
        modalSelect.classList.add('active');
        modal.classList.remove('active');
      }, 1000);
    };

    noBtnEventListener = () => {
      modalSelect.classList.add('active');
      modalConfirm.classList.remove('active');
      modal.classList.remove('active');
    };

    selectCancel.addEventListener('click', selectCancelEventListener);
    profileBtn.addEventListener('click', profileBtnEventListener);
    deleteBtn.addEventListener('click', deleteBtnEventListener);
    confirmCancel.addEventListener('click', noBtnEventListener);
    yesBtn.addEventListener('click', yesBtnEventListener);
    noBtn.addEventListener('click', noBtnEventListener);
  });
}

searchInput.addEventListener('input', searchStaff);
