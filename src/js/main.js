// Import the functions you need from the SDKs you need
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAXjktja_jwgeu_cQ9ajtG-vtP5nGHZzjo',
  authDomain: 'cms-solution-86408.firebaseapp.com',
  projectId: 'cms-solution-86408',
  storageBucket: 'cms-solution-86408.appspot.com',
  messagingSenderId: '714447279928',
  appId: '1:714447279928:web:219c3429fc0f4c5ed213cd',
  measurementId: 'G-E4Q9HYTK7N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage = getStorage(app);
let auth = getAuth();
let db = getFirestore(app);

const sort = document.querySelector('.dropdown--sort');
const sortWrap = sort.children[0].lastElementChild;
const sortArr = sortWrap.querySelectorAll('.dropdown__list');

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
  });
});

// value값 input으로 보내기
function valueReturn(optionEl) {
  const value = optionEl.value;
  sort.children[0].children[1].value = value;
}

// 검색창 포커스
const search = document.querySelector('.search__container');
const searchInput = search.firstElementChild;
searchInput.onfocus = () => {
  search.classList.add('default-input__container--focus');
};
searchInput.onblur = () => {
  search.classList.remove('default-input__container--focus');
};

// 검색창 value 값 입력
let searchValue = false;
function searchFunc() {
  searchValue = searchInput.value;
  let inputVal =
    document.querySelector('.dropdown--sort').firstElementChild.children[1]
      .value;
  getList(Number(inputVal), searchValue);
}

// 검색창 엔터 시 버튼 click
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
  querySnapshot.forEach((doc) => {
    const employee = doc.data();
    const trEl = document.createElement('tr');
    trEl.innerHTML = `
            <td>
                <div id="checkbox" class="checkbox">
                    <input type="checkbox" id="${employee.uid}">
                    <label for="${employee.uid}"><span></span>${employee.name} 선택</label>
                </div>
            </td>
            <td>
                <div class="photo-wrap"><img src="${employee.imgUrl}" alt="${employee.name}"></div>
            </td>
            <td>
                <a class="link" href="employee_write.html?uid=${employee.uid}">${employee.name}</a>
            </td>
            <td>${employee.email}</td>
            <td class="phone">${employee.phone}</td>
            <td>${employee.grade}</td>
        `;
    table.appendChild(trEl);
  });
};
await getList(0, '');

// 체크박스 input 대체
const table = document.querySelector('.table');
const checkboxes = table.querySelectorAll('.checkbox label');
let checkAll = document.getElementById('checkAll');

// span check시 input checked 설정
checkboxes.forEach((selectCheck) => {
  selectCheck.addEventListener('click', (e) => {
    const target = e.target;
    const checkbox = target.closest('.checkbox');
    const inputCheck = checkbox.firstElementChild;
    checkbox.classList.toggle('checkbox--checked');
    inputCheck.toggleAttribute('checked');
  });
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

// 선택한 데이터 삭제
const delButton = document.getElementById('delButton');
delButton.addEventListener('click', async () => {
  const checkedAll = document.querySelectorAll('.checkbox--checked');
  console.log(checkedAll);
  for (let i = 0; i < checkedAll.length; i++) {
    const uid = checkedAll[i].firstElementChild.id;
    const photoURL = ref(storage, 'images/' + uid);
    try {
      await deleteObject(photoURL);
      const userRef = doc(getFirestore(), 'employee', uid);
      await deleteDoc(userRef);
    } catch (error) {
      reportError(error);
    }
  }
  alert('삭제가 완료되었습니다.');
  window.location.href = '/';
});
