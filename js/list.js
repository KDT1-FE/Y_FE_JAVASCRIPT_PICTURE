import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  or,
} from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';
import { db } from './firebase.js';
import { phoneType } from './util.js';

// 직원 목록 DOM에 추가해주는 함수
const inquireListFunc = (querySnapshotArray) => {
  // 목록에서 이전 직원 목록 삭제
  document.querySelectorAll('.list-box').forEach((i) => {
    i.remove();
  });
  // 새로운 목록 삽입
  querySnapshotArray.forEach((doc) => {
    const boxTag = document.createElement('a');
    boxTag.href = `detail.html?id=${doc.id}`;
    boxTag.className = `list-box`;

    const checkTag = document.createElement('input');
    checkTag.type = 'checkbox';
    checkTag.className = 'delete-checkbox';
    checkTag.value = doc.id;
    checkTag.onclick = removeCheck;
    deleteList.forEach((i) => {
      if (i === doc.id) {
        checkTag.checked = true;
      }
    });

    const profileBox = document.createElement('div');
    profileBox.className = 'profile-box';
    const profileImg = document.createElement('img');
    profileImg.className = 'profile-img';
    profileImg.src = doc.data().profile;
    profileBox.appendChild(profileImg);

    const userName = document.createElement('span');
    userName.className = 'user-name';
    userName.innerText = doc.data().name;

    const userEmail = document.createElement('span');
    userEmail.className = 'user-email';
    userEmail.innerText = doc.data().email;

    const userPhoneNum = document.createElement('span');
    userPhoneNum.className = 'user-phoneNum';
    userPhoneNum.innerText = phoneType(doc.data().phone);

    boxTag.appendChild(checkTag);
    boxTag.appendChild(profileBox);
    boxTag.appendChild(userName);
    boxTag.appendChild(userEmail);
    boxTag.appendChild(userPhoneNum);

    const listContainer = document.querySelector('.list-container');
    listContainer.appendChild(boxTag);
  });
};

// 직원 전체 목록 가져오기 함수
const getAllUsers = async () => {
  await getDocs(collection(db, 'users')).then((users) => {
    inquireListFunc(users);
  });
};

// 페이지 로드 시 전체 목록 로드
getAllUsers();

// 직원 삭제 기능
let deleteList = [];
// 체크한 직원 배열에 삽입
const removeCheck = (e) => {
  if (e.target.checked) {
    if (!deleteList.includes(e.target.value)) {
      deleteList.push(e.target.value);
    }
  } else {
    deleteList = deleteList.filter((i) => {
      i !== e.target.value;
    });
  }
};

async function deleteDocuments() {
  try {
    const deletePromises = deleteList.map((id) =>
      deleteDoc(doc(db, 'users', id))
    );
    await Promise.all(deletePromises);
    alert('삭제되었습니다.');
    location.reload();
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
}

// 버튼을 클릭 시 삭제
const deleteBtn = document.querySelector('.delete-btn');
deleteBtn.addEventListener('click', async (e) => {
  if (deleteList.length > 0) {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteDocuments();
    } else {
      alert('취소되었습니다.');
    }
  } else {
    alert('삭제할 직원을 선택하세요.');
  }
});

// 직원 목록 검색 기능
const searchInput = document.querySelector('.search-input');
document
  .querySelector('.search-container')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchQuerySnapshot = await getDocs(
      query(
        collection(db, 'users'),
        or(
          where('name', '==', searchInput.value),
          where('email', '==', searchInput.value),
          where('phone', '==', searchInput.value)
        )
      )
    );
    // 검색 결과 표시(검색어가 없을 때는 전체 목록 표시)
    if (searchInput.value) {
      inquireListFunc(searchQuerySnapshot);
    } else {
      getAllUsers();
    }
  });

// 검색어를 지우면 전체 리스트 보여주기
searchInput.addEventListener('input', async (e) => {
  if (e.target.value === '') {
    getAllUsers();
  }
});
