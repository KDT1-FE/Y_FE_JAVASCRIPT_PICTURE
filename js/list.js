import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  or,
} from 'firebase/firestore';
import { db } from './firebase';
import defaultAvatar from '../assets/images/default-avatar.png';

const createListItem = (key, data) => {
  const customerItem = document.createElement('span');
  customerItem.className = `customer-${key}`;
  customerItem.innerText = data;
  return customerItem;
};

// 고객 목록 DOM에 추가해주는 함수
const inquireListFunc = querySnapshotArray => {
  // 목록에서 이전 결과(고객 목록) 삭제
  document.querySelectorAll('.list-wrapper').forEach(item => {
    item.remove();
  });
  // 새로운 목록 삽입
  querySnapshotArray.forEach(doc => {
    const wrapperTag = document.createElement('a');
    wrapperTag.href = `detail.html?id=${doc.id}`;
    wrapperTag.className = `list-wrapper`;

    const checkTag = document.createElement('input');
    checkTag.type = 'checkbox';
    checkTag.className = 'delete-checkbox';
    checkTag.value = doc.id;
    checkTag.onclick = removeCheck;
    deleteList.forEach(item => {
      if (item === doc.id) {
        checkTag.checked = true;
      }
    });

    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'avatar-wrapper';
    const avatarImg = document.createElement('img');
    avatarImg.className = 'avatar-img';
    avatarImg.src = doc.data().avatar;
    avatarImg.onerror = function () {
      this.onerror = null;
      this.src = defaultAvatar;
    };

    avatarWrapper.appendChild(avatarImg);

    const customerGrade = createListItem('grade', doc.data().grade);
    const customerName = createListItem('name', doc.data().name);
    const customerEmail = createListItem('email', doc.data().email);
    const customerPhone = createListItem('phone', doc.data().phone);

    wrapperTag.appendChild(checkTag);
    wrapperTag.appendChild(avatarWrapper);
    wrapperTag.appendChild(customerGrade);
    wrapperTag.appendChild(customerName);
    wrapperTag.appendChild(customerEmail);
    wrapperTag.appendChild(customerPhone);

    const listContainer = document.querySelector('.list-container');
    listContainer.appendChild(wrapperTag);
  });
};

// 고객 전체 목록 가져오기 함수
const getAllCustomers = async () => {
  const customers = await getDocs(collection(db, 'customers'));
  inquireListFunc(customers);
};

// 페이지 로드시 전체 목록 뿌려주기
getAllCustomers();

// 고객 삭제 기능
let deleteList = [];
// 체크한 고객 배열에 삽입 함수
const removeCheck = e => {
  if (e.target.checked) {
    if (!deleteList.includes(e.target.value)) {
      deleteList.push(e.target.value);
    }
  } else {
    deleteList = deleteList.filter(item => {
      item !== e.target.value;
    });
  }
  deleteList.length !== 0
    ? (document.getElementById('deleteBtn').disabled = false)
    : (document.getElementById('deleteBtn').disabled = true);
};
// 버튼 클릭하면 삭제 요청
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', async e => {
  if (deleteList.length > 0) {
    if (window.confirm('삭제하시겠습니까?')) {
      deleteList.forEach(async id => {
        await deleteDoc(doc(db, 'customers', id));
        alert('삭제되었습니다.');
        location.reload();
      });
    } else {
      alert('취소되었습니다.');
    }
  } else {
    alert('삭제할 고객을 선택하세요.');
  }
});

// 고객 목록 검색 기능
const searchInput = document.querySelector('.search-input');
document
  .querySelector('.search-container')
  .addEventListener('submit', async e => {
    e.preventDefault();
    const searchQuerySnapshot = await getDocs(
      query(
        collection(db, 'customers'),
        or(
          where('name', '==', searchInput.value),
          where('email', '==', searchInput.value),
          where('phone', '==', searchInput.value),
          where('grade', '==', searchInput.value)
        )
      )
    );
    // 검색 결과 표시
    // 검색어가 없을 때는 전체 목록 표시
    if (searchInput.value) {
      inquireListFunc(searchQuerySnapshot);
    } else {
      getAllCustomers();
    }
  });

// 검색어 지우면 전체 리스트 보여주기
searchInput.addEventListener('input', async e => {
  if (e.target.value === '') {
    getAllCustomers();
  }
});
