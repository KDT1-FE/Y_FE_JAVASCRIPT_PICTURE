import { debounce } from 'lodash';

const tBody = document.querySelector('tbody');
const searchInput = document.querySelector('.search-input');
const modal = document.querySelector('.modal');
const profileBtn = document.querySelector('.profile-btn');
const deleteBtn = document.querySelector('.delete-btn');
const modalCancel = document.querySelector('.modal-cancel');
let getItem = JSON.parse(localStorage.getItem('infos'));

// localStorage에서 정보들 가져와서 리스트 생성
if (getItem) {
  getItem.forEach((item) => {
    createStaffList(item);
  });
}

// debounce를 활용한 검색 함수
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

searchInput.addEventListener('input', searchStaff);

// 리스트 생성 함수
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

  // 임직원 클릭 시 임직원 상세정보 페이지로 이동
  tr.addEventListener('click', function () {
    const data = JSON.stringify(item);
    localStorage.setItem('lately-info', data);

    // 상세보기 or 삭제하기 버튼 클릭
    modal.classList.add('active');
    modalCancel.addEventListener('click', function () {
      modal.classList.remove('active');
    });
    // 상세보기 버튼
    profileBtn.addEventListener('click', function () {
      modal.classList.remove('active');
      location.href = './profile.html';
    });

    // 삭제하기 버튼
    deleteBtn.addEventListener('click', function () {
      getItem = getItem.filter((el) => el['id'] !== item['id']);

      // localStorage 리스트 다시 생성
      const data = JSON.stringify(getItem);
      localStorage.setItem('infos', data);
      tr.remove();

      modal.classList.remove('active');
    });
  });
}
