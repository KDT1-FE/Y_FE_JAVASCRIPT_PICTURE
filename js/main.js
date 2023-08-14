// 로딩 애니메이션이 페이지 로드 후에는 사라지게 함
window.addEventListener('load', function () {
  // 실제로는 로딩이 더 빠르지만, 아예 로딩이 안되는 것 처럼 보일 수 있기에 시각적 표현을 위해 0.25초간 딜레이 추가
  setTimeout(function () {
    document.getElementById('loader').style.display = 'none';
  }, 250);
});

// 체크박스 컨트롤
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
