// 전역 변수
let page = 1;
let isLoading = false;
let hasMore = true;
let observer = null;
let currentKeyword = '';

const loader = document.getElementById('profile-loader');
const profileList = document.querySelector('.profile-list');

const positions = {
  1: 'CEO',
  2: 'CFO',
  3: 'Director',
  4: 'Manager',
  5: 'Assistant Manager',
  6: 'Staff',
};

function getPositionLabel(value) {
  return positions[value] || 'Unknown Position';
}

// 함수: 페이지 사이즈 결정
function determinePageSize() {
  const width = window.innerWidth;
  if (width <= 480) return 3;
  if (width <= 768) return 5;
  return 7;
}
const PAGE_SIZE = determinePageSize();

// 함수: 로딩 표시
function showLoader() {
  loader.style.display = 'flex'; // flex로 변경하여 스피너를 중앙에 정렬
  loader.innerText = ''; // 기존 텍스트를 삭제
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  loader.appendChild(spinner); // 스피너 추가
}

function hideLoader() {
  loader.style.display = 'none';
}

// 함수: 직원 리스트 innerHTML 반환
function getProfileItemHTML(member, index) {
  const profileImageURL =
    member.profileimageurl || '/asset/image/no-profile-image.png';

  return `
      <td class="checkbox-cell"><input type="checkbox" data-id="${
        member.id
      }" class="member-checkbox"></td>
      <td>${index}</td>
      <td><img src="${profileImageURL}" class="profile-table__image" alt="프로필 이미지"></td>
      <td><div class="profile-table__id">${member.id}</div></td>
      <td>${member.name}</td>
      <td>${getPositionLabel(member.position)}</td>
  `;
}

// 함수: 직원 리스트 생성
function createProfileItem(member, index) {
  const tr = document.createElement('tr');

  tr.innerHTML = getProfileItemHTML(member, index);

  tr.addEventListener('click', (event) => {
    const checkbox = tr.querySelector('input[type="checkbox"]');

    // 체크박스나 체크박스가 있는 셀을 클릭한 경우
    if (
      event.target.classList.contains('checkbox-cell') ||
      event.target.className === 'member-checkbox'
    ) {
      if (event.target !== checkbox) {
        checkbox.checked = !checkbox.checked; // 체크박스 상태를 변경
      }

      if (checkbox.checked) {
        tr.classList.add('checked-row');
      } else {
        tr.classList.remove('checked-row');
      }
    } else {
      window.location.href = `/member/editMember/${member.id}`; // 직원 수정 페이지로 이동
    }
  });

  return tr;
}

// 함수: ㅣ직원 삭제
function deleteMembers(ids) {
  fetch('/member/deleteMember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('선택된 직원이 성공적으로 삭제되었습니다.');
        window.location.reload();
      } else {
        alert('직원 삭제에 실패했습니다.');
      }
    })
    .catch((error) => {
      console.error(`에러가 발생했습니다: ${error.message}`);
      alert('직원 삭제에 실패했습니다.');
    });
}

// 함수: 직원 목록 가져오기
function getMembers(pageNumber, keyword = '') {
  if (isLoading || (pageNumber > 1 && !hasMore)) {
    return; // 이미 로드 중이거나 모든 직원을 로드한 경우 중복 요청을 받지 않음
  }

  isLoading = true; // 데이터를 로드 중
  showLoader();

  const url = !keyword
    ? `/member/getMembers?page=${pageNumber}&pageSize=${PAGE_SIZE}`
    : `/member/getMembers?page=${pageNumber}&pageSize=${PAGE_SIZE}&keyword=${keyword}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        // 서버에서 받아온 hasMore 값으로 global hasMore를 갱신
        hasMore = data.hasMore;

        // 검색어가 있을 경우 기존 목록을 초기화
        if (keyword && pageNumber === 1) {
          profileList.innerHTML = '';
        }
        const members = data.member;
        if (members && members.length > 0) {
          members.forEach((member, index) => {
            const globalIndex = (pageNumber - 1) * PAGE_SIZE + index + 1;
            const profileItem = createProfileItem(member, globalIndex);
            profileList.appendChild(profileItem);
          });

          const lastElement = profileList.lastElementChild;
          if (observer) observer.observe(lastElement);
        } else if (pageNumber === 1) {
          profileList.innerHTML =
            '<p class="empty-set">검색 결과가 없습니다.</p>';
        } else if (!hasMore) {
          // 추가적인 직원이 없을 때, 마지막 요소의 관찰을 중단
          observer.unobserve(profileList.lastElementChild);
        }

        hideLoader(); // 데이터를 가져온 후 로더를 숨김
        isLoading = false; // 로딩 중 플래그를 해제
      }, 1000);
    })
    .catch((error) => {
      hideLoader();
      console.log(`에러가 발생했습니다: ${error.message}`);
      alert('직원 목록을 불러오는 데 실패했습니다.');
    });
}

// 함수: IntersectionObserver 콜백
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && hasMore && !isLoading) {
      page += 1;
      getMembers(page, currentKeyword);
    }
  });
};

// 함수: IntersectionObserver 초기화
function initObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  observer = new IntersectionObserver(handleIntersection, options);
}

// 함수: 입력 텀 제한
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
  initObserver();
  getMembers(1);

  // 이벤트 리스너: 직원 등록 버튼
  const registerButton = document.querySelector('.profile-actions__btn--add');
  registerButton.addEventListener('click', () => {
    window.location.href = '/member/newMember';
  });

  // 이벤트 리스너: 직원 삭제 버튼
  const deleteButton = document.querySelector('.profile-actions__btn--delete');
  deleteButton.addEventListener('click', () => {
    const checkedRows = document.querySelectorAll('.checked-row');
    // 체크된 요소들의 데이터 ID를 가져옴
    const idsToDelete = Array.from(checkedRows).map((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      return checkbox.dataset.id;
    });

    if (idsToDelete.length > 0) {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm(
        `선택한 ${idsToDelete.length}명을 삭제하겠습니까?`,
      );

      if (confirmation) {
        deleteMembers(idsToDelete);
      }
    } else {
      alert('삭제할 직원을 선택하세요.');
    }
  });

  // 이벤트 리스너: 검색
  const searchInput = document.querySelector('.profile-search__input');
  const debouncedSearch = debounce((keyword) => {
    profileList.innerHTML = ''; // 기존 프로필 리스트 지우기
    currentKeyword = keyword;
    page = 1;
    getMembers(page, keyword, true);
  }, 1000);

  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value;
    debouncedSearch(keyword);
  });

  // 헤더의 체크박스 이벤트 추가
  const headerCheckbox = document.querySelector(
    '.profile-table-header__check-box input[type="checkbox"]',
  );
  headerCheckbox.addEventListener('change', () => {
    const memberCheckboxes = document.querySelectorAll('.member-checkbox');
    const allRows = document.querySelectorAll('.profile-list tr');

    memberCheckboxes.forEach((checkbox, index) => {
      // eslint-disable-next-line no-param-reassign
      checkbox.checked = headerCheckbox.checked;

      // 헤더 체크박스의 상태에 따라 각 행의 checked-row 클래스 추가/제거
      if (headerCheckbox.checked) {
        allRows[index].classList.add('checked-row');
      } else {
        allRows[index].classList.remove('checked-row');
      }
    });
  });
});
