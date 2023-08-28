let profileListWrap = document.getElementById('list-area');
const createBtn = document.getElementById('create-btn');
const deleteBtn = document.getElementById('delete-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-btn');
const counselingTypes = {
  상담중: { className: 'btn-primary' },
  치료중: { className: 'btn-danger' },
  종결: { className: 'btn-warning' }
};


showLoadingImage();

// 초기 렌더링
const render = function () {
  db.collection('person')
    .get()
    .then((result) => {
      let profileList = '';
      result.forEach((doc) => {

        // 상담종류에 따라 버튼 색상 달라짐
        // if (doc.data().sort === '상담중') {
        //   btnClass = 'btn-primary';
        // } else if (doc.data().sort === '치료중') {
        //   btnClass = 'btn-danger';
        // } else if (doc.data().sort === '종결') {
        //   btnClass = 'btn-warning';
        // }

        const counselingType = counselingTypes[doc.data().sort];
        const btnClass = counselingType ? counselingType.className : '';

        profileList += `
   <a href="./sub/sub.html?id=${doc.id}" class="list-item card">
  <input type="checkbox" name="selection" value="${doc.data().name}" onclick="checkSelectAll()"/>
     <p class="card-img-wrap">
       <img src="${doc.data().image}" class="card-img-top" />
     </p>
     <div class="card-body">

     <span class="card-text">${doc.data().name}</span>
     <span class="card-text">/ ${doc.data().gender}</span>
     <span class="card-text">/ ${doc.data().age}</span>
  <p class="card-text user-text">담당 상담사 : ${doc.data().currentUser}</p>
  <p class="card-text memo-text">${doc.data().memo}</p>
     <p class="btn ${btnClass}">${doc.data().sort}</p>
   </div>
   </a>
`;
      });

      profileListWrap.innerHTML = profileList;
      hideLoadingImage();
    });
};

render();

// 프로필 새로 등록할 페이지로 이동
const createList = function () {
  window.location.href = './sub/regis.html';
};

// 프로필 삭제하기
const deleteList = function () {
  const auth = firebase.auth();
  let deleteList = [];

  const checkboxes = document.querySelectorAll('input[name="selection"]:checked');

  checkboxes.forEach((checkbox) => {
    const checkedParent = checkbox.closest('a');
    let docIdToDelete = checkedParent.getAttribute('href').split('id=')[1];
    deleteList.push(docIdToDelete);
  });

  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert('로그인 후에 사용 가능합니다');
    window.location.href = '/sub/login.html';
    return;
  }

  if (deleteList.length == 0) {
    alert('삭제할 프로필이 없습니다')
    return;
  }

  Promise.all(deleteList.map((docId) => db.collection('person').doc(docId).get()))
    .then((docs) => {
      const deletableDocs = docs.filter((doc) => doc.data().uid === currentUser.uid);
      if (currentUser.uid == 'jusBruEPBGcrT4YlxuBR3wuquYo2' || deletableDocs.length == deleteList.length) {

        const confirmed = window.confirm('정말로 삭제하시겠습니까?');

        if (confirmed) {
          Promise.all(deleteList.map((docId) => db.collection('person').doc(docId).delete()))
            .then(() => {
              alert('삭제되었습니다');
              render();
            })
            .catch((error) => {
              console.error('Error deleting document: ', error);
            });
        } else {
          // 취소를 선택한 경우
          console.log('삭제 작업이 취소되었습니다.');
        }

      }  else {
        alert('작성자만 삭제할 수 있습니다');
        return;
      }
    })
    .catch((error) => {
      console.error('Error getting document: ', error);
    });
};

// 검색하기
function searchList() {
  const inputValue = searchInput.value;

  db.collection('person')
    // .where('name', '>=', inputValue)
    // .where('name', '<=', inputValue + '\uf8ff')
    .get()
    .then((result) => {
      let profileList = '';
      const filteredResults = result.docs.filter(doc => doc.data().name.includes(inputValue));
      if (result.empty) {
        profileList = '<p class="text-center w-100">검색 결과가 없습니다.</p>';
      } else {
        filteredResults.forEach((doc) => {

          const counselingType = counselingTypes[doc.data().sort];
          const btnClass = counselingType ? counselingType.className : '';


          profileList += `
        <a href="./sub/sub.html?id=${doc.id}" class="list-item card">
  <input type="checkbox" name="selection" value="${doc.data().name}" onclick="checkSelectAll()"/>
     <p class="card-img-wrap">
       <img src="${doc.data().image}" class="card-img-top" />
     </p>
     <div class="card-body">

     <span class="card-text">${doc.data().name}</span>
     <span class="card-text">/ ${doc.data().gender}</span>
     <span class="card-text">/ ${doc.data().age}</span>
  <p class="card-text user-text">담당 상담사 : ${doc.data().currentUser}</p>
  <p class="card-text memo-text">${doc.data().memo}</p>
     <p class="btn ${btnClass}">${doc.data().sort}</p>
   </div>
   </a>
    `;
        });
      }

      profileListWrap.innerHTML = profileList;
    });
}

resetBtn.addEventListener('click', function () {
  location.reload();
});

searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchList();
  }
});

searchBtn.addEventListener('click', searchList);
createBtn.addEventListener('click', createList);
deleteBtn.addEventListener('click', deleteList);
searchBtn.addEventListener('click', searchList);

// 체크박스 전체선택 및 해제
function checkSelectAll() {
  // 전체 체크박스
  const checkboxes = document.querySelectorAll('input[name="selection"]');
  // 선택된 체크박스
  const checked = document.querySelectorAll('input[name="selection"]:checked');
  // select all 체크박스
  const selectAll = document.querySelector('input[name="selectall"]');

  if (checkboxes.length === checked.length) {
    selectAll.checked = true;
  } else {
    selectAll.checked = false;
  }
}

function selectAll(selectAll) {
  const checkboxes = document.getElementsByName('selection');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

function sortFiltering() {
  const filterCheckboxes = document.querySelectorAll('#filter-area input[type="checkbox"]');
  let checkedList = [];

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // 체크박스 상태에 따라 원하는 작업을 수행하도록 작성
      if (checkbox.checked) {
        // 체크될 때의 동작
        checkedList.push(checkbox.value);

        // 추가 작업을 여기에 작성
      } else {
        // 체크 해제될 때의 동작
        checkedList = checkedList.filter((item) => item !== checkbox.value);

        // 추가 작업을 여기에 작성
      }
      filteredRender(checkedList);
    });
  });
}

// 상담종류 필터링
function filteredRender(selectedSorts) {
  let query = db.collection('person');

  if (selectedSorts.length > 0) {
    query = query.where('sort', 'in', selectedSorts);
  }

  query.get().then((result) => {
    let profileList = '';
    result.forEach((doc) => {

      const counselingType = counselingTypes[doc.data().sort];
      const btnClass = counselingType ? counselingType.className : '';

      profileList += `
          <a href="./sub/sub.html?id=${doc.id}" class="list-item card">
          <input type="checkbox" name="selection" value="${doc.data().name}" onclick="checkSelectAll()"/>
          <p class="card-img-wrap">
          <img src="${doc.data().image}" class="card-img-top" />
          </p>
          <div class="card-body">

          <span class="card-text">${doc.data().name}</span>
          <span class="card-text">/ ${doc.data().gender}</span>
          <span class="card-text">/ ${doc.data().age}</span>
          <p class="card-text user-text">담당 상담사 : ${doc.data().currentUser}</p>
          <p class="card-text memo-text">${doc.data().memo}</p>
          <p class="btn ${btnClass}">${doc.data().sort}</p>
          </div>
          </a>
          `;
    });

    profileListWrap.innerHTML = profileList;
    hideLoadingImage();
  });
}

// 페이지 로드 시 체크박스 변경 이벤트 핸들러를 등록
window.addEventListener('DOMContentLoaded', sortFiltering);