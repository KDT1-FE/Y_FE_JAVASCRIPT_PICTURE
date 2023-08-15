// <!-- LODING ANIMATION -->
// 로딩 애니메이션이 페이지 로드 후에는 사라지게 함
window.addEventListener('load', function () {
  // 실제로는 로딩이 더 빠르지만, 아예 로딩이 안되는 것 처럼 보일 수 있기에 시각적 표현을 위해 0.25초간 딜레이 추가
  setTimeout(function () {
    document.getElementById('loader').style.display = 'none';
  }, 250);
});

// <!-- CHECKBOX CONTROL -->
// 체크박스 클릭 시, 이벤트 버블링을 중단
// -> 체크박스 클릭 시 모달과 오버레이가 나타나지 않게 할 수 있음
document.querySelectorAll('.staff-list__item .item-checkbox').forEach((checkbox) => {
  checkbox.addEventListener('click', function (event) {
    event.stopPropagation(); // 이벤트 버블링 중지
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // 삭제 버튼과 체크 박스를 선택
  const deleteButton = document.querySelector('.toolbar__btn .btn.disabled');
  const checkboxes = document.querySelectorAll('.item-checkbox');
  const selectAllCheckbox = document.querySelector('.staff-list .inner .staff-list__title #selectAll');

  // 체크 박스가 변경될 때 상태를 확인하는 함수
  function checkStatus() {
    // 체크 박스 중 하나라도 체크되어 있는지 확인
    const checked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    if (checked) {
      deleteButton.classList.remove('disabled');
      deleteButton.removeAttribute('disabled');
    } else {
      deleteButton.classList.add('disabled');
      deleteButton.setAttribute('disabled', '');
    }
  }

  function toggleSelectAll() {
    // selectAllCheckbox의 체크 상태를 기반으로 모든 체크 박스의 상태를 변경
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });

    // 체크 상태 변경 후 checkStatus 함수를 호출하여 삭제 버튼의 상태를 갱신
    checkStatus();
  }

  // 모든 체크 박스에 'change' 이벤트 리스너를 추가
  // 체크 박스의 상태가 변경될 때마다 checkStatus 함수를 호출
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', checkStatus);
  });

  // selectAll 체크 박스에 change 이벤트 리스너를 추가
  selectAllCheckbox.addEventListener('change', toggleSelectAll);
});

// <!-- SEARCH CONTROL -->
// 더미데이터 검색 뼈대
// // HTML에 있는 검색 입력란을 참조
// const searchInput = document.querySelector('.search');

// // 기존의 직원 목록을 배열로 저장 (실제 사용 시에는 데이터베이스 또는 서버에서 가져온 데이터로 대체)
// const staffList = [
//   {
//     name: '박지성',
//     email: 'example1@example.com',
//     phone: '010-1234-5678',
//     category: '사원',
//     image: './images/profile.jpeg',
//   },
//   {
//     name: '김주력',
//     email: 'example2@example.com',
//     phone: '010-1234-5678',
//     category: '사원',
//     image: './images/profile.jpeg',
//   },
//   {
//     name: '이재희',
//     email: 'example3@example.com',
//     phone: '010-1234-5678',
//     category: '사원',
//     image: './images/profile.jpeg',
//   },
//   {
//     name: '박지현',
//     email: 'example4@example.com',
//     phone: '010-1234-5678',
//     category: '사원',
//     image: './images/profile.jpeg',
//   },
//   {
//     name: '홍길동',
//     email: 'example5@example.com',
//     phone: '010-1234-5678',
//     category: '사원',
//     image: './images/profile.jpeg',
//   },
// ];

// // 검색 입력란에 이벤트 리스너를 추가
// searchInput.addEventListener('input', function (event) {
//   // 입력한 키워드를 가져옴
//   const keyword = event.target.value;

//   // 키워드로 직원 목록을 필터링
//   const filteredList = staffList.filter((staff) => staff.name.includes(keyword) || staff.email.includes(keyword));

//   // 필터링된 결과를 화면에 표시
//   displayStaffList(filteredList);
// });

// // 직원 목록을 화면에 표시하는 함수
// function displayStaffList(list) {
//   const ul = document.querySelector('.staff-list__item ul');
//   ul.innerHTML = ''; // 기존 목록을 비움

//   // 새로운 목록을 생성
//   list.forEach((staff) => {
//     const li = document.createElement('li');
//     li.innerHTML = `
//       <input type="checkbox" class="item-checkbox" />
//       <img src="${staff.image}" alt="사진" class="item-image" />
//       <span class="item-name">${staff.name}</span>
//       <span class="item-email">${staff.email}</span>
//       <span class="item-phone">${staff.phone}</span>
//       <span class="item-category">${staff.category}</span>
//     `;
//     ul.appendChild(li);
//   });
// }

// // 처음 페이지가 로딩될 때 전체 직원 목록을 화면에 표시
// displayStaffList(staffList);

// <!-- MODAL CONTROL -->
// 모달 열기 및 데이터 매핑
const staffItems = document.querySelectorAll('.staff-list__item ul li');
const modal = document.querySelector('.staff-modal');

staffItems.forEach((item) => {
  item.addEventListener('click', () => {
    const name = item.querySelector('.item-name').textContent;
    const email = item.querySelector('.item-email').textContent;
    const phone = item.querySelector('.item-phone').textContent;
    const category = item.querySelector('.item-category').textContent;

    modal.querySelector('.info-name__content').textContent = name;
    modal.querySelector('.info-email__content').textContent = email;
    modal.querySelector('.info-phone__content').textContent = phone;
    modal.querySelector('.info-category__content').textContent = category;

    modal.classList.add('show');
  });
});

// TODO: 정보 수정 버튼

// <!-- OVERLAY CONTROL -->
// 오버레이 엘리먼트 참조
const overlay = document.querySelector('.overlay');

let selectedItem = null; // 선택된 아이템을 저장할 변수

// 모달 열기 이벤트에 오버레이 표시 로직 추가
staffItems.forEach((item) => {
  item.addEventListener('click', () => {
    // 이전에 선택된 아이템이 있다면 강조 제거
    if (selectedItem) {
      selectedItem.classList.remove('selected-item');
    }

    // 현재 선택된 아이템 강조
    item.classList.add('selected-item');
    selectedItem = item; // 선택된 아이템 저장

    document.body.style.overflow = 'hidden'; // 원래 페이지의 스크롤 막기
    overlay.classList.add('show'); // 오버레이 보이기
    modal.classList.add('show'); // 모달 보이기
  });
});

// 오버레이 클릭 이벤트 (모달 및 오버레이 닫기)
overlay.addEventListener('click', () => {
  document.body.style.overflow = ''; // 원래 페이지의 스크롤 복구
  overlay.classList.remove('show'); // 오버레이 숨기기
  modal.classList.remove('show'); // 모달 숨기기

  // 선택된 아이템 강조 제거
  if (selectedItem) {
    selectedItem.classList.remove('selected-item');
    selectedItem = null; // 선택된 아이템 초기화
  }

  // 모달 페이지 닫으면 모달 페이지 내부의 정보 수정 취소
  revertModalToDefaultState();
});

// 정보 수정 버튼을 클릭하면 수정 모드로 변경하고,
// '취소' 버튼과 '저장' 버튼을 클릭하면 원래 상태로 되돌리는 로직을 구현
const editBtn = document.querySelector('.staff-modal .edit-btn');
const editEnableBtnGroup = document.querySelector('.staff-modal .edit-enable-btn-group');
const cancelBtn = document.querySelector('.staff-modal .cancel-btn');
const saveBtn = document.querySelector('.staff-modal .save-btn');
const changeImageBtn = document.querySelector('.staff-modal .change-image-btn');
const modalContent = document.querySelector('.staff-modal__content');

// 정보 수정 버튼 클릭 이벤트
editBtn.addEventListener('click', () => {
  editBtn.style.display = 'none'; // 정보 수정 버튼 숨기기
  editEnableBtnGroup.style.display = 'flex'; // 취소, 저장 버튼 보이기
  changeImageBtn.style.display = 'block'; // 사진 변경 버튼 보이기

  // 각 __content 요소를 텍스트 입력 필드로 변경
  ['name', 'email', 'phone', 'category'].forEach((key) => {
    const contentElement = modalContent.querySelector(`.info-${key}__content`);
    const inputValue = contentElement.textContent;
    contentElement.innerHTML = `<input type="text" value="${inputValue}" class="info-${key}-input" />`;
  });
});

// 취소 버튼 클릭 이벤트
cancelBtn.addEventListener('click', revertModalToDefaultState);

// 저장 버튼 클릭 이벤트
saveBtn.addEventListener('click', () => {
  // 정보 저장 로직
  // 파이어베이스 연동
  revertModalToDefaultState(); // 저장 후 원래 상태로 되돌리기
});

// 사진 변경 클릭 이벤트
changeImageBtn.addEventListener('click', () => {
  // 사진 변경 로직
  // 사진 변경 UI(아마 파일 선택창)를 보여주고, 사용자가 사진을 선택하면 업데이트
});

// 모달 상태 원래대로 되돌리는 함수
function revertModalToDefaultState() {
  // 버튼 상태 되돌리기
  editBtn.style.display = 'block';
  editEnableBtnGroup.style.display = 'none';
  changeImageBtn.style.display = 'none'; // 사진 변경 버튼 숨기기

  // 각 입력 필드의 값을 다시 텍스트로 변경
  ['name', 'email', 'phone', 'category'].forEach((key) => {
    const inputElement = modalContent.querySelector(`.info-${key}-input`);
    if (inputElement) {
      const contentElement = modalContent.querySelector(`.info-${key}__content`);
      contentElement.textContent = inputElement.value;
    }
  });
}
