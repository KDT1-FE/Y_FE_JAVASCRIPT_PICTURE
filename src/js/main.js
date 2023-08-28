import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  getStorage,
  uploadBytesResumable,
  getMetadata,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  where,
  or,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore/lite';
import inputFocusEvent from './basic.js';
import { loading, hideLoading } from './loading.js';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage = getStorage(app);
let auth = getAuth();
let db = getFirestore(app);

const sort = document.querySelector('.dropdown--sort');
const sortWrap = sort.children[0].lastElementChild;
const sortArr = sortWrap.querySelectorAll('.dropdown__list');
let nowPageValue = 1;

// drop list value 값 지정
for (let i = 0; i < sortArr.length; i++) {
  const sortLi = sortWrap.children[0].children[i];
  sortLi.value = i;
}

// 정렬창 select 된 값으로 span 값 바꾸기
function sortOption(optionEl) {
  const sortBox = sort.querySelector('.dropdown__display');
  const sortEl = sortBox.firstElementChild;
  sortEl.textContent = optionEl.textContent;
}

// 클릭 시 타겟 지정, 드랍다운 닫기
sortArr.forEach((sortList) => {
  sortList.addEventListener('click', (e) => {
    const targetEl = e.target.parentElement;
    const isOptionEl = targetEl.classList.contains('dropdown__list');
    if (isOptionEl) sortOption(targetEl);
    sort.classList.remove('dropdown--open');
    const searchValue = searchInput.value;
    getList(targetEl.value, searchValue);
    valueReturn(targetEl);
    removeAllCheck();
  });
});

// value값 input으로 보내기
function valueReturn(optionEl) {
  const value = optionEl.value;
  sort.children[0].children[1].value = value;
}

inputFocusEvent();

// 검색창 value 값 입력
let searchValue = false;
function searchFunc() {
  searchValue = searchInput.value;
  let inputVal =
    document.querySelector('.dropdown--sort').firstElementChild.children[1]
      .value;
  getList(Number(inputVal), searchValue);
  removeAllCheck();
}

// 검색창 엔터 시 버튼 click
const search = document.querySelector('.search__container');
const searchInput = search.firstElementChild;
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchFunc();
  }
});

// 검색 버튼 click 이벤트
const searchButton = document.querySelector('.search button');
searchButton.addEventListener('click', () => {
  searchFunc();
});

// 임직원 관리 리스팅
const getList = async (inputVal, value) => {
  loading();
  const table = document.querySelector('.table__list');
  table.innerHTML = '';
  let q;

  if (inputVal === 1) {
    q = query(collection(db, 'employee'), orderBy('name')); // 이름순 정렬
    if (value) {
      q = query(
        collection(db, 'employee'),
        or(where('name', '==', value), where('email', '==', value)),
      );
    }
  } else if (inputVal === 2) {
    q = query(collection(db, 'employee'), orderBy('email')); // 이메일순 정렬
    if (value) {
      q = query(
        collection(db, 'employee'),
        or(where('name', '==', value), where('email', '==', value)),
      );
    }
  } else if (inputVal === 0) {
    q = query(collection(db, 'employee'), orderBy('date', 'desc')); // 최신순 정렬
    if (value) {
      q = query(
        collection(db, 'employee'),
        or(where('name', '==', value), where('email', '==', value)),
      );
    }
  }

  const querySnapshot = await getDocs(q);

  // 정렬 함수 호출
  const sortData = sortDocs(querySnapshot, inputVal);

  // 페이지네이션 함수 호출
  const { totalPage, SliceDocs } = getPagination(sortData, nowPageValue, 5);

  // 페이지네이션 버튼 생성 함수 호출
  createPagination(totalPage, nowPageValue, inputVal, value);

  SliceDocs.forEach((doc) => {
    const employee = doc.data();
    const trEl = document.createElement('tr');
    let imgUrl, imgLabel;
    if (employee.imgUrl) {
      imgUrl = employee.imgUrl;
      imgLabel = `${employee.name} 이미지`;
    } else {
      imgUrl = '/asset/no-image.png';
      imgLabel = '이미지 없음';
    }
    trEl.innerHTML = `
            <td>
                <div class="photo-wrap" style="background-image:url(${imgUrl})" aria-label="${imgLabel}"></div>
            </td>
            <td>
                <a class="link" href="employee_write.html?uid=${employee.uid}">${employee.name}</a>
            </td>
            <td>${employee.email}</td>
            <td class="phone">${employee.phone}</td>
            <td>${employee.grade}</td>
        `;
    const td = document.createElement('td');
    const div = document.createElement('div');
    div.id = 'checkbox';
    div.classList.add('checkbox');
    td.appendChild(div);
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = employee.uid;
    div.appendChild(input);
    const label = document.createElement('label');
    label.setAttribute('for', `${employee.uid}`);
    label.innerHTML = '선택';
    div.appendChild(label);
    const span = document.createElement('span');
    span.addEventListener('click', (e) => {
      const target = e.target;
      const checkbox = target.closest('.checkbox');
      const inputCheck = checkbox.firstElementChild;
      checkbox.classList.toggle('checkbox--checked');
      inputCheck.toggleAttribute('checked');
    });

    let checkAll = document.getElementById('checkAll');
    checkAll.addEventListener('input', (e) => {
      const isSelect = e.target.parentElement;
      const isChecked = e.target.checked;
      if (!isChecked) input.setAttribute('checked', '');
      else input.removeAttribute('checked');
      div.classList = isSelect.classList;
    });

    label.prepend(span);
    trEl.prepend(td);
    table.appendChild(trEl);
  });
  hideLoading();
};
await getList(0, '');

// 정렬 함수
function sortDocs(querySnapshot, inputVal) {
  const sortData = [...querySnapshot.docs];

  if (inputVal === 1) {
    sortData.sort((a, b) => {
      if (a.data().name > b.data().name) return 1;
      else if ((a.data().name = b.data().name))
        return a.data().email > b.data().email ? 1 : -1;
      else return -1;
    });
  } else if (inputVal === 2) {
    sortData.sort((a, b) => {
      if (a.data().email > b.data().email) return 1;
      else if ((a.data().email = b.data().email))
        return a.data().name > b.data().name ? 1 : -1;
      else return -1;
    });
  } else if (inputVal === 0) {
    sortData.sort((a, b) => {
      return a.data().date > b.data().date ? -1 : 1;
    });
  }

  return sortData;
}

// 페이지네이션 함수
function getPagination(docs, nowPage, limit) {
  const totalPage = Math.ceil(docs.length / limit);
  const SliceDocs = docs.slice((nowPage - 1) * limit, nowPage * limit);

  return { totalPage, SliceDocs };
}

// 페이지네이션 버튼 생성 함수
function createPagination(totalPage, nowPage, inputVal, value) {
  const paginationList = document.querySelector('.pagination__list');
  paginationList.innerHTML = ''; // 기존 페이지 버튼 제거

  const buttonsPerGroup = 5; // 한 그룹당 버튼 개수
  let currentPageGroup = Math.ceil(nowPage / buttonsPerGroup); // 현재 페이지의 그룹 번호
  const totalPageGroups = Math.ceil(totalPage / buttonsPerGroup); // 전체 페이지 그룹 개수

  const startButton = (currentPageGroup - 1) * buttonsPerGroup + 1;
  const endButton = Math.min(currentPageGroup * buttonsPerGroup, totalPage);

  const prevGroupButton = document.getElementById('list-previous');
  const nextGroupButton = document.getElementById('list-next');

  for (let i = startButton; i <= endButton; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('pagination__item');
    if (i === nowPage) button.classList.add('pagination__item--selected');
    button.addEventListener('click', (e) => {
      prevGroupButton.removeEventListener('click', prevGroupButtonClickHandler);
      nextGroupButton.removeEventListener('click', nextGroupButtonClickHandler);
      nowPageValue = Number(e.target.textContent);
      getList(inputVal, value);
      removeAllCheck();
    });
    paginationList.appendChild(button);
  }

  function prevGroupButtonClickHandler() {
    prevGroupButton.removeEventListener('click', prevGroupButtonClickHandler);
    prevGroupButton.removeAttribute('disabled');
    currentPageGroup -= 1;
    const startButton = (currentPageGroup - 1) * buttonsPerGroup + 1;
    nowPageValue = startButton;
    getList(inputVal, value);
    removeAllCheck();
    if (currentPageGroup > 1) {
      prevGroupButton.removeAttribute('disabled');
    } else {
      prevGroupButton.setAttribute('disabled', '');
    }
  }
  function nextGroupButtonClickHandler() {
    nextGroupButton.removeEventListener('click', nextGroupButtonClickHandler);
    const table = document.querySelector('.table__list');
    table.innerHTML = '';
    currentPageGroup += 1;
    const startButton = (currentPageGroup - 1) * buttonsPerGroup + 1;
    nowPageValue = startButton;
    getList(inputVal, value);
    removeAllCheck();
    if (currentPageGroup < totalPageGroups) {
      nextGroupButton.removeAttribute('disabled');
    } else {
      nextGroupButton.setAttribute('disabled', '');
    }
  }

  // 이전 페이지 그룹 버튼
  if (currentPageGroup > 1) {
    prevGroupButton.removeAttribute('disabled');
    prevGroupButton.addEventListener('click', prevGroupButtonClickHandler);
  }

  // 다음 페이지 그룹 버튼
  if (currentPageGroup < totalPageGroups) {
    nextGroupButton.removeAttribute('disabled');
    nextGroupButton.addEventListener('click', nextGroupButtonClickHandler);
  }
}

// 체크박스 input 대체
const table = document.querySelector('.table');
const checkboxes = table.querySelectorAll('.checkbox label');
let checkAll = document.getElementById('checkAll');

// span check시 input checked 설정

checkAll.addEventListener('click', (e) => {
  const target = e.target;
  const checkbox = target.closest('.checkbox');
  const inputCheck = checkbox.firstElementChild;
  checkbox.classList.toggle('checkbox--checked');
  inputCheck.toggleAttribute('checked');
});

// 전체 선택 체크박스가 check되면 모든 체크박스 check
checkAll.addEventListener('input', (e) => {
  const isSelect = e.target.parentElement;
  const isChecked = e.target.checked;
  checkboxes.forEach((selectCheck) => {
    const checkbox = selectCheck.parentElement;
    const inputCheck = checkbox.firstElementChild;
    if (!isChecked) inputCheck.setAttribute('checked', '');
    else inputCheck.removeAttribute('checked');
    checkbox.classList = isSelect.classList;
  });
});

// 전체 선택 체크박스 선택 해제
function removeAllCheck() {
  let checkAll = document.getElementById('checkAll');
  checkAll.removeAttribute('checked');
  checkAll.parentElement.classList.remove('checkbox--checked');
  window.scrollTo(0, 0);
}

// 선택한 데이터 삭제
const delButton = document.getElementById('delButton');
delButton.addEventListener('click', async () => {
  const checkedAll = document.querySelectorAll('.checkbox--checked');
  console.log(checkedAll);
  for (let i = 0; i < checkedAll.length; i++) {
    const uid = checkedAll[i].firstElementChild.id;
    const photoURL = ref(storage, 'images/' + uid);
    const photoLabel = document.querySelector('.photo-wrap').ariaLabel;
    try {
      if (photoLabel !== '이미지 없음') await deleteObject(photoURL);
      const userRef = doc(getFirestore(), 'employee', uid);
      await deleteDoc(userRef);
      alert('삭제가 완료되었습니다.');
      window.location.href = '/employee_list.html';
    } catch (error) {
      console.log(error.code);
    }
  }
});
