import {
  storage,
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "./firebase.js";

const visibleEmployees = 10; // 처음에 보이는 직원 수
const additionalEmployees = 3; // 스크롤링할 때 추가로 보여지는 직원 수
let lastVisibleEmployeeIndex = visibleEmployees - 1; // 마지막으로 보이는 직원 인덱스
let allEmployeesLoaded = false;
// 로컬스토리지에 있는 데이터 가져오기
let allKeys = Object.keys(localStorage);

// 초기 리스팅
listEmployees(0, lastVisibleEmployeeIndex);

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", () => {
  // 직원이 더이상 없다면
  if (allEmployeesLoaded) {
    return;
  }

  // 뷰포트의 맨 아래와 현재 스크롤 위치의 합이 문서 전체 높이와 거의 같을 때 추가 데이터 불러오기
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadMoreEmployees();
  }
});

// 유저 로드
function loadUser(data) {
  const userList = `
        <tr data-name="${data.name}">
        <td class='check'><input type="checkbox" ></td>
        <td><img src="" id="${data.key}"></td>
        <td><span>${data.name}</span></td>
        <td><span>${data.email}</span></td>
        <td><span>${data.phone}</span></td>
        <td><span>${data.classification}</span></td>
        <td><button class='profile-btn'>프로필 보기</button></td>
        </tr>`;
  $("tbody").append(userList);
  if (data.hasImage) {
    getDownloadURL(ref(storage, `image/${data.key}`))
      .then((url) => {
        const img = $(`#${data.key}`);

        img.attr("src", url);
      })
      .catch((error) => {
        console.log("실패");
      });
  } else {
    getDownloadURL(ref(storage, `image/default.png`))
      .then((url) => {
        const img = $(`#${data.key}`);
        img.attr("src", url);
      })
      .catch((error) => {
        console.log("실패");
      });
  }
}

// 초기 직원 목록 리스팅 함수
function listEmployees(startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    const key = allKeys[i];
    // hasExcuted 처음 접속해서 데이터 생성했는지 안했는지 여부를 조사하는 로컬스토리지 데이터 (더미데이터 생성용)
    if (key === "hasExecuted") {
      continue;
    }
    const storedUserInfo = localStorage.getItem(key);

    if (storedUserInfo !== null) {
      const userInfo = JSON.parse(storedUserInfo);
      loadUser(userInfo);
    }
  }

  // 프로필 보기 버튼 클릭이벤트 리스너
  $(".profile-btn").on("click", function (event) {
    const row = $(this).closest("tr");

    const userName = row.find("td:nth-child(3) span").text();
    const userEmail = row.find("td:nth-child(4) span").text();
    const userPhone = row.find("td:nth-child(5) span").text();
    const userClassification = row.find("td:nth-child(6) span").text();

    // url 넘겨주기
    const profileUrl = `profile.html?name=${encodeURIComponent(
      userName
    )}&email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(
      userPhone
    )}&classification=${encodeURIComponent(userClassification)}`;

    window.location.href = profileUrl;
  });
}

// 추가 데이터를 가져오는 함수
function loadMoreEmployees() {
  // 마지막으로 보이는 직원 인덱스 업데이트
  lastVisibleEmployeeIndex += additionalEmployees;
  if (lastVisibleEmployeeIndex >= allKeys.length - 1) {
    allEmployeesLoaded = true;
    return;
  }
  // 추가 데이터를 가져와서 리스팅
  listEmployees(
    lastVisibleEmployeeIndex - additionalEmployees + 1,
    lastVisibleEmployeeIndex
  );
}

// 임직원 삭제 버튼 클릭 이벤트 리스너
$(".remove-btn").on("click", () => {
  const promises = [];

  allKeys.forEach((key) => {
    let storedUserInfo = localStorage.getItem(key);
    let userInfo = JSON.parse(storedUserInfo);

    // 체크박스에 체크가 되었다면
    if ($(`tr[data-name="${userInfo.name}"] input`).prop("checked")) {
      const storage = getStorage();
      const desertRef = ref(storage, `image/${userInfo.key}`);

      const removePromise = deleteObject(desertRef)
        .then(() => {
          console.log("파일 삭제 성공");
        })
        .catch((error) => {
          console.log("데이터 삭제 오류", error);
        });

      localStorage.removeItem(key);

      promises.push(removePromise);
    }
  });
  Promise.all(promises)
    .then(() => {
      console.log("삭제 완료");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log("삭제 실패", error);
    });
});

// 검색기능
let input = $(".search-input");
const tbody = $("tbody");

input.on("input", (e) => {
  tbody.html("");
  for (let i = 0; i < allKeys.length; i++) {
    // 모든 키 조회
    const key = allKeys[i];
    const storedUserInfo = localStorage.getItem(key);
    const userInfo = JSON.parse(storedUserInfo);
    if (userInfo !== true) {
      // hasExcuted로 인해 에러방지
      let hasName = userInfo.name.includes($(e.target).val());
      if (hasName) {
        loadUser(userInfo);
      }
    }
  }
});
