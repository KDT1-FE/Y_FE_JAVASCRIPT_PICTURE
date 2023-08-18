import _ from 'lodash';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Firebase 설정
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

// Database와 Storage 참조
const database = firebase.database();
const storage = firebase.storage().ref();

// <!-- LODING ANIMATION -->
const loadingSpinner = document.getElementById('loader');

// <!-- 최신 생성 or 업데이트 아이템 강조 로직 -->
function highlightNewItem() {
  database.ref('staff').on('value', (snapshot) => {
    let staffArray = [];
    snapshot.forEach((childSnapshot) => {
      let staff = childSnapshot.val();
      staff.id = childSnapshot.key;
      staffArray.push(staff);
    });

    // 타임스탬프의 내림차순으로 재정렬
    staffArray.sort((a, b) => b.timestamp - a.timestamp);

    const newOrUpdatedStaff = staffArray[0];

    // 아이템의 timestamp를 사용하여 DOM에서 해당 아이템 찾기
    const newOrUpdatedItemDOM = document.querySelector(`[data-staff-timestamp="${newOrUpdatedStaff.timestamp}"]`);

    if (newOrUpdatedItemDOM) {
      newOrUpdatedItemDOM.classList.add('highlighted');
      newOrUpdatedItemDOM.addEventListener('animationend', function () {
        newOrUpdatedItemDOM.classList.remove('highlighted');
      });
    }
  });
}

// <!-- SEARCH -->
// 임직원 리스트 필터링
window.filterStaffList = function () {
  const searchQuery = document.querySelector('.search').value.toLowerCase();
  const staffListItems = document.querySelectorAll('.staff-list__item ul li');

  staffListItems.forEach((item) => {
    const name = item.querySelector('.item-name').textContent.toLowerCase();
    const email = item.querySelector('.item-email').textContent.toLowerCase();
    const phone = item.querySelector('.item-phone').textContent.toLowerCase();
    const category = item.querySelector('.item-category').textContent.toLowerCase();

    // 이름, 이메일, 연락처, 구분 중 일치하는 정보가 있으면 표시, 없으면 숨김
    if (
      name.includes(searchQuery) ||
      email.includes(searchQuery) ||
      phone.includes(searchQuery) ||
      category.includes(searchQuery)
    ) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
};

// <!-- REGISTER MODAL CONTROL -->
// 임직원 등록 모달 열기 함수
function openRegisterModal() {
  const registerModal = document.querySelector('.register-modal');
  const overlayRegister = document.querySelector('.overlay-register');
  registerModal.classList.add('show');
  overlayRegister.classList.add('show');
  document.body.classList.add('no-scroll');
}

// 임직원 등록 모달 닫기 함수
function closeRegisterModal() {
  const registerModal = document.querySelector('.register-modal');
  const overlayRegister = document.querySelector('.overlay-register');

  // 모달 내부의 입력 데이터 초기화
  document.getElementById('staff-photo').value = ''; // 이미지 입력 초기화
  document.getElementById('staff-name').value = ''; // 이름 입력 초기화
  document.getElementById('staff-email').value = ''; // 이메일 입력 초기화
  document.getElementById('staff-phone').value = ''; // 전화번호 입력 초기화
  document.getElementById('staff-category').value = ''; // 카테고리 입력 초기화

  // 이미지 미리보기 초기화
  const output = document.getElementById('image-preview');
  output.src = '';
  output.style.display = 'none';

  registerModal.classList.remove('show');
  overlayRegister.classList.remove('show');
  document.body.classList.remove('no-scroll');
}

// 임직원 등록 처리 함수
function registerStaff(e) {
  e.preventDefault();

  // 사용자에게 확인 알림 제공
  const confirmRegistration = window.confirm('유저를 등록하시겠습니까?');

  if (!confirmRegistration) return; // 사용자가 확인을 클릭하지 않으면 함수 실행 중지

  // 로딩 스피너 표시
  loadingSpinner.style.display = 'block';

  const imageFile = document.getElementById('staff-photo').files[0];
  const name = document.getElementById('staff-name').value;
  const email = document.getElementById('staff-email').value;
  const phone = document.getElementById('staff-phone').value;
  const category = document.getElementById('staff-category').value;

  // 파일 업로드
  const imageRef = storage.child(`images/${imageFile.name}`);
  imageRef.put(imageFile).then((snapshot) => {
    snapshot.ref.getDownloadURL().then((url) => {
      // 데이터베이스에 정보 저장
      const newStaffRef = database.ref('staff').push();
      newStaffRef.set({
        name,
        email,
        phone,
        category,
        imageUrl: url,
        timestamp: firebase.database.ServerValue.TIMESTAMP, // 최신 업데이트 아이템순 정렬을 위해 타임스탬프 추가
      });

      // 로딩 스피너 숨기기
      loadingSpinner.style.display = 'none';

      // 모달 창 닫기
      closeRegisterModal();

      highlightNewItem();
    });
  });
}

// 모달 열기 (임직원 등록 버튼 클릭 이벤트)
document.querySelector('.btn.register-staff').addEventListener('click', openRegisterModal);

// 모달 닫기 (Overlay 클릭 이벤트)
document.querySelector('.overlay-register').addEventListener('click', closeRegisterModal);

// 임직원 등록 폼 제출 이벤트
document.querySelector('.btn.submit-btn').addEventListener('click', registerStaff);

// 임직원 리스트 실시간 반영 및 렌더링
database.ref('staff').on('value', (snapshot) => {
  const staffList = document.querySelector('.staff-list__item ul');

  // 로딩 스피너 표시
  loadingSpinner.style.display = 'block';

  staffList.innerHTML = '';

  let staffArray = [];
  snapshot.forEach((childSnapshot) => {
    let staff = childSnapshot.val();
    staff.id = childSnapshot.key; // key도 같이 저장합니다.
    staffArray.push(staff);
  });

  // 타임스탬프의 내림차순으로 재정렬
  staffArray.sort((a, b) => b.timestamp - a.timestamp);

  staffArray.forEach((staffData) => {
    const li = document.createElement('li');
    // 최신 아이템 하이라이팅을 위해 timestamp 값을 data-staff-timestamp 속성으로 추가
    li.setAttribute('data-staff-timestamp', staffData.timestamp);

    li.innerHTML = `
      <input type="checkbox" class="item-checkbox" />
      <img src="${staffData.imageUrl}" alt="사진" class="item-image" />
      <span class="item-name">${staffData.name}</span>
      <span class="item-email">${staffData.email}</span>
      <span class="item-phone">${staffData.phone}</span>
      <span class="item-category">${staffData.category}</span>
    `;

    staffList.appendChild(li);
  });

  // 로딩 스피너 숨기기
  loadingSpinner.style.display = 'none';

  // 페이지 최상단으로 스크롤
  window.scrollTo(0, 0);
});

// <!-- CHECKBOX CONTROL & STAFF MODAL DATA MAPPING CONTROL-->
document.addEventListener('DOMContentLoaded', function () {
  // '임직원 삭제' 버튼 활성화/비활성화 관리
  function updateDeleteButton() {
    const checkboxes = document.querySelectorAll('.staff-list input[type="checkbox"]:not(#selectAll)');
    const deleteButton = document.querySelector('.delete-staff');

    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        deleteButton.removeAttribute('disabled');
        deleteButton.classList.remove('disabled');
        return; // 하나라도 체크된 것이 있으면 바로 리턴
      }
    }

    // 체크된 항목이 없으면 삭제 버튼 비활성화
    deleteButton.setAttribute('disabled', 'disabled');
    deleteButton.classList.add('disabled');
  }

  // 모든 staff-list 아이템 체크박스의 선택 관리
  document.querySelector('#selectAll').addEventListener('change', function (e) {
    const checkboxes = document.querySelectorAll('.staff-list input[type="checkbox"]:not(#selectAll)');
    for (let checkbox of checkboxes) {
      checkbox.checked = e.target.checked;
    }
    updateDeleteButton();
  });

  // staff-list 아이템 클릭 이벤트 위임
  document.querySelector('.staff-list__item ul').addEventListener('click', function (e) {
    if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      // 체크박스 클릭 시 모달을 열지 않도록 이벤트 중지
      e.stopPropagation();
      updateDeleteButton();
    } else if (e.target && e.target.tagName !== 'INPUT') {
      // 이외의 영역(staff list item 영역) 클릭 시 모달 내부 데이터 매핑
      const li = e.target.closest('li');

      if (li) {
        // 선택된 아이템의 데이터를 가져옵니다
        const imageUrl = li.querySelector('.item-image').src;
        const name = li.querySelector('.item-name').textContent;
        const email = li.querySelector('.item-email').textContent;
        const phone = li.querySelector('.item-phone').textContent;
        const category = li.querySelector('.item-category').textContent;

        // 모달에 데이터를 매핑합니다
        const modal = document.querySelector('.staff-modal');
        modal.querySelector('.info-image').src = imageUrl;
        modal.querySelector('.info-name__content').textContent = name;
        modal.querySelector('.info-email__content').textContent = email;
        modal.querySelector('.info-phone__content').textContent = phone;
        modal.querySelector('.info-category__content').textContent = category;

        // 아이템 클릭시에 ID를 모달에 저장해두기
        const staffDataRef = database
          .ref('staff')
          .orderByChild('email')
          .equalTo(li.querySelector('.item-email').textContent);
        staffDataRef.once('value', (snapshot) => {
          const key = Object.keys(snapshot.val())[0]; // 이 키를 사용하여 수정시 데이터를 변경합니다.
          modal.setAttribute('data-id', key);
        });

        // 기존에 선택된 아이템의 강조색을 제거
        let selectedItem = document.querySelector('.selected-item');
        if (selectedItem) {
          selectedItem.classList.remove('selected-item');
        }

        // 현재 클릭된 아이템에 강조색을 추가
        li.classList.add('selected-item');
      }
    }
  });

  const deleteButton = document.querySelector('.delete-staff');
  const staffList = document.querySelector('.staff-list__item ul');

  deleteButton.addEventListener('click', async function () {
    const confirmation = window.confirm('정말로 선택한 임직원을 삭제하시겠습니까?');

    if (confirmation) {
      const checkboxes = staffList.querySelectorAll('input[type="checkbox"]:checked:not(#selectAll)');
      for (let checkbox of checkboxes) {
        const li = checkbox.closest('li');
        const emailToDelete = li.querySelector('.item-email').textContent;

        // 파이어베이스에서 해당 항목 삭제
        const staffDataRef = database.ref('staff').orderByChild('email').equalTo(emailToDelete);
        await staffDataRef.once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            childSnapshot.ref.remove();
          });
        });

        // 화면에서 해당 아이템 삭제
        li.remove();
      }

      // 삭제 후 체크박스 상태와 삭제 버튼 상태를 업데이트
      document.querySelector('#selectAll').checked = false;
      updateDeleteButton();

      alert('선택한 임직원이 성공적으로 삭제되었습니다.');
    }
  });
});

// <!-- STAFF MODAL CONTROL-->
document.addEventListener('DOMContentLoaded', function () {
  // DOM이 완전히 로드되면 아래 코드 실행
  const staffList = document.querySelector('.staff-list');

  // 모달 열기
  staffList.addEventListener('click', function (event) {
    // 클릭된 요소가 .staff-list__item 안에 있는 경우만 처리
    if (event.target.closest('.staff-list__item')) {
      const staffModal = document.querySelector('.staff-modal');
      staffModal.classList.add('show'); // staff-modal에 'show' 클래스 추가
      const overlay = document.querySelector('.overlay-staff');
      overlay.classList.add('show'); // overlay에 'show' 클래스 추가

      // 모달 없는 원래 스크린 스크롤 바 억제
      document.body.classList.add('no-scroll');
    }
  });

  // 모달 창 밖의 오버레이를 클릭하면 모달 창 닫기
  const overlay = document.querySelector('.overlay-staff');
  overlay.addEventListener('click', function () {
    const staffModal = document.querySelector('.staff-modal');
    staffModal.classList.remove('show'); // staff-modal에서 'show' 클래스 제거
    overlay.classList.remove('show'); // overlay에서 'show' 클래스 제거

    // 선택된 아이템의 강조색을 제거
    let selectedItem = document.querySelector('.selected-item');
    if (selectedItem) {
      selectedItem.classList.remove('selected-item');
    }

    // 모달 없는 원래 스크린 스크롤 바 복구
    document.body.classList.remove('no-scroll');
  });
});

// <!-- STAFF MODAL EDIT STATE CONTROL -->
// DOM 캐싱
const modal = document.querySelector('.staff-modal');
const editEnableBtnGroup = document.querySelector('.edit-enable-btn-group');
const changeImageButton = document.querySelector('.change-image-btn');
const editButton = document.querySelector('.btn.edit-btn');
const originalData = {}; // 원래의 데이터를 보관

// '정보 수정' 버튼 이벤트 리스너
editButton.addEventListener('click', function () {
  editButton.style.display = 'none';
  editEnableBtnGroup.style.display = 'block';
  changeImageButton.style.display = 'block';

  modal.querySelectorAll('.staff-modal__info > div').forEach((div) => {
    const contentSpan = div.querySelector('span:last-child');
    const content = contentSpan.textContent;

    originalData[div.className] = content;

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = content;
    div.replaceChild(inputEl, contentSpan);
  });

  originalData['image'] = modal.querySelector('.info-image').src;
});

// 정보 편집 모드 이전으로 UI 변경
function revertToOriginal() {
  editButton.style.display = 'block';
  editEnableBtnGroup.style.display = 'none';
  changeImageButton.style.display = 'none';

  modal.querySelectorAll('.staff-modal__info > div').forEach((div) => {
    const inputEl = div.querySelector('input');

    const contentSpan = document.createElement('span');
    contentSpan.className = `${div.classList[0]}__content`;
    contentSpan.textContent = originalData[div.className];

    div.replaceChild(contentSpan, inputEl);
  });

  // 모달 데이터를 원래 데이터로 되돌림
  modal.querySelector('.info-image').src = originalData['image'];
  modal.querySelector('.info-name__content').textContent = originalData['name'].value;
  modal.querySelector('.info-email__content').textContent = originalData['email'].value;
  modal.querySelector('.info-phone__content').textContent = originalData['phone'].value;
  modal.querySelector('.info-category__content').textContent = originalData['category'].value;
}

// '사진 변경' 버튼 후 로직
// 이미지 파일 업로드를 위한 hidden input 요소 추가
const imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.style.display = 'none';
imageInput.accept = 'image/*'; // 이미지만 허용

document.body.appendChild(imageInput);

changeImageButton.addEventListener('click', function () {
  imageInput.click(); // hidden input 클릭 시 트리거
});

// 이미지 선택 후, 선택된 이미지 미리보기
imageInput.addEventListener('change', function () {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      modal.querySelector('.info-image').src = e.target.result; // 미리보기 표시
    };
  }
});

// '취소' 버튼 클릭했을 때 로직
document.querySelector('.btn.cancel-btn').addEventListener('click', revertToOriginal);

// '저장' 버튼을 클릭했을 때의 로직
document.querySelector('.btn.save-btn').addEventListener('click', async function () {
  // 로딩 스피너 표시
  loadingSpinner.style.display = 'block';

  const id = modal.getAttribute('data-id');

  const newImageUrl = modal.querySelector('.info-image').src;
  const newName = modal.querySelector('.info-name input').value;
  const newEmail = modal.querySelector('.info-email input').value;
  const newPhone = modal.querySelector('.info-phone input').value;
  const newCategory = modal.querySelector('.info-category input').value;

  // 이미지 URL이 변경되었을 경우에만 업로드 수행
  if (originalData['image'] !== modal.querySelector('.info-image').src) {
    if (imageInput.files.length > 0) {
      // [ 중요 NOTICE ]
      // 이미지 삭제 기능을 구현하였습니다. 하지만 이미지가 고유의 url을 가지고 있더라도,
      // 결국 참조하는 원본 소스는 동일한 사진을 가리키기 때문에 다른 리스트 아이템에 영향을 주게 됩니다.
      // 따라서, 싱글 유저 서비스를 지향하는 본 서비스의 테스트를 위해
      // 파이어베이스 스토어의 이미지 삭제 기능 부분은 주석 처리하였습니다.
      // README.md 및 PR에도 본 내용을 언급하겠습니다.

      // 기존 이미지 삭제
      // if (originalData['image']) {
      //   const oldImageRef = firebase.storage().refFromURL(originalData['image']);
      //   try {
      //     await oldImageRef.delete();
      //   } catch (error) {
      //     console.error("Error deleting old image: ", error);
      //   }
      // }

      // 이미지 변경
      const imageFile = imageInput.files[0];
      const imageRef = storage.child(`images/${imageFile.name}`);
      await imageRef.put(imageFile);

      const url = await imageRef.getDownloadURL();
      originalData['image'] = url; // 기존 코드에서 이미 이렇게 설정하고 있음
    }
  }

  // Firebase 데이터 업데이트
  await database.ref('staff/' + id).update({
    name: newName,
    email: newEmail,
    phone: newPhone,
    category: newCategory,
    imageUrl: originalData['image'],
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });

  // 로딩 스피너 숨기기
  loadingSpinner.style.display = 'none';

  // Alert 추가하여 사용자에게 업데이트 성공을 알림
  alert('임직원 정보가 업데이트되었습니다.');

  // 정보 수정 완료되면 자동으로 모달 및 오버레이 닫기
  const staffModal = document.querySelector('.staff-modal');
  const overlay = document.querySelector('.overlay-staff');
  staffModal.classList.remove('show'); // staff-modal에서 'show' 클래스 제거
  overlay.classList.remove('show'); // overlay에서 'show' 클래스 제거

  // 스크롤바 동작 복구
  document.body.classList.remove('no-scroll');

  // 페이지 최상단으로 스크롤
  window.scrollTo(0, 0);

  highlightNewItem();

  // 모달 UI 상태를 원래대로 되돌림
  revertToOriginal();
});

// 오버레이 클릭하여 모달 닫으면 편집 취소
const overlay = document.querySelector('.overlay-staff');
overlay.addEventListener('click', function () {
  revertToOriginal();
  const staffModal = document.querySelector('.staff-modal');
  staffModal.classList.remove('show'); // staff-modal에서 'show' 클래스 제거
  overlay.classList.remove('show'); // overlay에서 'show' 클래스 제거
});

// <!-- 리사이즈 로직 -->
function updateImageVisibility() {
  const images = document.querySelectorAll('.item-image');
  if (window.innerWidth < 768) {
    images.forEach((image) => {
      image.classList.add('item-image--hidden');
    });
  } else {
    images.forEach((image) => {
      image.classList.remove('item-image--hidden');
    });
  }
}
// 처음 페이지 로드시 이미지 가시성 업데이트
updateImageVisibility();
// 리사이즈 이벤트 리스너 추가
window.addEventListener('resize', updateImageVisibility);

// <!-- TO TOP BUTTON -->
gsap.registerPlugin(ScrollToPlugin);
const toTopEl = document.querySelector('#to-top');

window.addEventListener(
  'scroll',
  _.throttle(function () {
    console.log(window.scrollY);
    if (window.scrollY > 200) {
      // gsap.to(요소, 지속시간, 옵션);
      // 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
);
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});
