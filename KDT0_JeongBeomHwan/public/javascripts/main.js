const delBtnEl = document.querySelector(".main-toolbar_rightcontainer_buttons .btn-sm.outlined"); // 선택 삭제 버튼
const mainAddBtnEl = document.querySelector(".main-toolbar_rightcontainer_buttons .btn-sm.filled"); //팝업 켜기 버튼

const dimEl = document.querySelector("#DIM"); // DIM요소
const popUpEl = document.querySelector("section.popup-container"); //팝업 컨테이너
const popUpCloseBtnEl = document.querySelector(".popup-header span:last-child"); //팝업 닫기 버튼
const popupHeaderEl = document.querySelector(".popup-header span:first-child"); //팝업 헤더 제목
const popupAddBtnEl = document.querySelector(".popup-buttons .btn-md:last-child"); //팝업- 저장 버튼
const popupCancelBtnEl = document.querySelector(".popup-buttons .btn-md:first-child"); //팝업 취소 버튼

const ProfileListContainerEl = document.querySelector(".listtable-tablerows-container"); // 프로필이 쌓이는 컨테이너
const primeCheckbox = document.querySelector("input[type='checkbox']");

let employeeArr = [];

// 프로필 생성하기 버튼 클릭 시
popupAddBtnEl.addEventListener("click", (event) => {
  const popupInputEls = document.querySelectorAll(".popup-contents-container input");
  const [koName, enName, email, tel, file] = popupInputEls;
  const popupSelectEls = document.querySelectorAll(".popup-contents-container select");
  const [team, author] = popupSelectEls;

  let flag = true;
  let employeeProfileCard = {
    employeeKoName: koName.value,
    employeeEnName: enName.value,
    employeeTeam: team.value,
    employeeEmail: email.value,
    employeeTel: tel.value,
    employeeAuthor: author.value,
    employeeFile: file.value,
    employeeID: new Date().getTime(),
  };

  for (let i = 0; i < 4; i++) {
    if (i === 1) continue;
    if (!popupInputEls[i].value) {
      flag = false;
      sendToast("입력하지 않은 항목이 있습니다.", "error");
      break;
    }
  }
  if (popupHeaderEl.innerText === "직원 프로필 추가" && !checkValid(employeeProfileCard)) {
    sendToast("동일한 연락처 혹은 이메일을 사용하는 사용자가 있습니다.", "error");
    flag = false;
  }

  if (flag === false) return;

  //새로 만드는 녀석인지 변경하는 녀석인지 알아내기
  if (popupHeaderEl.innerText === "직원 프로필 추가") {
    //새로 만드는 녀석 플로우
    employeeArr.push(employeeProfileCard);
    checkEmpTotalNum();
    saveLocalStorage();
    paintProfileEl(employeeProfileCard);

    sendToast("직원 프로필을 생성하였습니다.", "success"); // 토스트 생성
  } else {
    let temp = JSON.parse(popupAddBtnEl.dataset.obj);
    let flag = false;
    for (let i = 0; i < employeeArr.length; i++) {
      if (employeeArr[i].employeeID === temp.employeeID) {
        employeeArr[i].employeeKoName = employeeProfileCard.employeeKoName;
        employeeArr[i].employeeEnName = employeeProfileCard.employeeEnName;
        employeeArr[i].employeeEmail = employeeProfileCard.employeeEmail;
        employeeArr[i].employeeTel = employeeProfileCard.employeeTel;
        employeeArr[i].employeeAuthor = employeeProfileCard.employeeAuthor;
        employeeArr[i].employeeFile = employeeProfileCard.employeeFile;
        flag = true;
      }
    }
    if (flag !== true) {
      sendToast("알 수 없는 이유로 수정할 수 없습니다.", "error");
      return;
    }

    saveLocalStorage();
    ProfileListContainerEl.replaceChildren();
    loadLocalStorage();
    //변경하는 녀석 플로우
    // 1. 배열에서 해당 목록 정보 수정하기 v
    // 2. localStorage에 해당 목록 정보 업데이트하기
    // 3. 실제 화면에서 그리기

    employeeArr.filter;

    sendToast("해당 직원 프로필을 변경하였습니다.", "success"); // 토스트 생성
  }

  popupInputEls.forEach((el) => (el.value = "")); // 입력 값 지우기
  closePopup();
  console.log("전송 완료!");
});

/* 
  토스트 메세지 보내기 함수
*/
function sendToast(msg, type) {
  const toastContainerEl = document.querySelector(".toast-message");
  const iconEl = toastContainerEl.querySelector("span:first-child");
  const messageEl = toastContainerEl.querySelector("span:last-child");

  if (type === "success") {
    iconEl.value = "check_circle";
  } else {
    iconEl.innerText = "error";
  }

  messageEl.innerText = msg;
  toastContainerEl.classList.remove("none");
  setTimeout(() => {
    toastContainerEl.classList.add("none");
  }, 3000);
}

/*
  로컬 스토리지 저장하기 / 불러오기 함수
*/
function saveLocalStorage() {
  localStorage.setItem("employeeCard", JSON.stringify(employeeArr));
}
loadLocalStorage();
function loadLocalStorage() {
  employeeArr = JSON.parse(localStorage.getItem("employeeCard")) || [];
  if (!employeeArr.length) return;
  employeeArr.forEach((item) => paintProfileEl(item));
  checkEmpTotalNum();
}

/*
  valid 체크 함수
*/
function checkValid(employeeProfileCard) {
  if (!employeeArr.length) return true;
  for (let i = 0; i < employeeArr.length; i++) {
    if (employeeArr[i].employeeEmail === employeeProfileCard.employeeEmail) {
      return false;
    } else if (employeeArr[i].employeeTel === employeeProfileCard.employeeTel) {
      return false;
    }
  }
  return true;
}

/*
  프로필 그리기 함수
*/
function paintProfileEl(employeeProfileCard) {
  const profileCardEl = document.createElement("article");
  profileCardEl.classList.add("employeecard-container");

  for (let i = 0; i < 7; i++) {
    if (!i) {
      let nameEl = document.createElement("div");
      nameEl.classList.add("employeecard-column");

      let dividerEl = document.createElement("div");
      dividerEl.classList.add("divider-el");
      profileCardEl.append(nameEl, dividerEl);
    } else {
      let column = document.createElement("div");
      column.classList.add("employeecard-column");

      const dividerEl = profileCardEl.querySelector(".divider-el");
      dividerEl.append(column);
    }
  }

  const columnEls = profileCardEl.querySelectorAll(".employeecard-column");
  const [profileCheckEl, nameEl, emailEl, telEl, teamEl, authorEl, iconsEl] = columnEls;
  profileCheckEl.classList.add("profile-check");
  nameEl.classList.add("name");
  emailEl.classList.add("e-mail");
  telEl.classList.add("tel");
  teamEl.classList.add("team");
  authorEl.classList.add("author");
  iconsEl.classList.add("icon-area");

  const checkboxCol = document.createElement("input");
  checkboxCol.setAttribute("type", "checkbox");
  checkboxCol.dataset.obj = JSON.stringify(employeeProfileCard);
  profileCheckEl.append(checkboxCol);

  const profileCol = document.createElement("div");
  profileCol.classList.add("employeecard-column_profilecard");
  profileCheckEl.append(profileCol);

  const koNameCol = document.createElement("span");
  koNameCol.classList.add("ko-name");
  koNameCol.innerText = employeeProfileCard.employeeKoName;
  nameEl.append(koNameCol);

  const enNameCol = document.createElement("span");
  enNameCol.classList.add("en-name");
  enNameCol.innerText = employeeProfileCard.employeeEnName;
  nameEl.append(enNameCol);

  const emailCol = document.createElement("span");
  emailCol.innerText = employeeProfileCard.employeeEmail;
  emailEl.append(emailCol);

  const telCol = document.createElement("span");
  telCol.innerText = employeeProfileCard.employeeTel;
  telEl.append(telCol);

  const teamCol = document.createElement("span");
  teamCol.innerText = employeeProfileCard.employeeTeam;
  teamEl.append(teamCol);

  const authorCol = document.createElement("author");
  authorCol.innerText = employeeProfileCard.employeeAuthor;
  authorEl.append(authorCol);

  const iconModifyCol = document.createElement("span");
  iconModifyCol.classList.add("material-symbols-outlined");
  iconModifyCol.innerText = "edit_note";
  iconModifyCol.dataset.obj = JSON.stringify(employeeProfileCard);
  iconModifyCol.addEventListener("click", openPopup);

  const iconDeleteCol = document.createElement("span");
  iconDeleteCol.classList.add("material-symbols-outlined");
  iconDeleteCol.innerText = "delete";
  iconDeleteCol.dataset.obj = JSON.stringify(employeeProfileCard);
  iconDeleteCol.addEventListener("click", deleteList);

  iconsEl.append(iconModifyCol, iconDeleteCol);

  console.log("PC", profileCardEl);
  console.log("CL", columnEls);

  ProfileListContainerEl.prepend(profileCardEl);
}

/* 
  팝업 켜기 함수 & 끄기 함수
*/
function openPopup(event) {
  const popupInputEls = document.querySelectorAll(".popup-contents-container input");
  const [koName, enName, email, tel, file] = popupInputEls;
  const popupSelectEls = document.querySelectorAll(".popup-contents-container select");
  const [team, author] = popupSelectEls;

  popupInputEls.forEach((item) => (item.value = ""));
  team.value = "개발";
  author.value = "직원";

  if (event.target === mainAddBtnEl) {
    popupHeaderEl.innerText = "직원 프로필 추가";
  } else {
    popupHeaderEl.innerText = "직원 프로필 변경";
    popupAddBtnEl.dataset.obj = event.target.dataset.obj;
  }

  if (event.target.dataset.obj) {
    // 변경인 경우
    let temp = JSON.parse(event.target.dataset.obj);

    koName.value = temp.employeeKoName;
    enName.value = temp.employeeEnName;
    email.value = temp.employeeEmail;
    tel.value = temp.employeeTel;
    file.value = temp.employeeFile;
    team.value = temp.employeeTeam;
    author.value = temp.employeeAuthor;
  }

  dimEl.classList.remove("none");
  popUpEl.classList.remove("none");
}
function closePopup() {
  popupAddBtnEl.dataset.obj = ""; //데이터셋 초기화
  dimEl.classList.add("none");
  popUpEl.classList.add("none");
}

/*
  삭제하기 함수
*/
function deleteList(event) {
  let userResponse = confirm("이 프로필을 정말로 삭제하시겠어요?");
  if (!userResponse) return;
  const target = event.target.closest("article");
  target.remove();
  const temp = JSON.parse(event.target.dataset.obj);
  console.log(temp);

  employeeArr = employeeArr.filter((item) => item.employeeID !== temp.employeeID);
  saveLocalStorage();
  checkEmpTotalNum();
}

/*
  직원 수 카운터 함수
*/
function checkEmpTotalNum() {
  const empTotalNumEl = document.querySelector(".main-toolbar_desc span:last-child");
  empTotalNumEl.innerHTML = `  ${employeeArr.length} 명`;
  checkEmptyList();
}

function checkEmptyList() {
  const EmptyListEl = document.querySelector(".no-profile");
  if (employeeArr.length) {
    console.log(checkEmptyList, "!");
    EmptyListEl.classList.add("none");
  } else {
    EmptyListEl.classList.remove("none");
  }
}

/*
  전체 체크 및 전체 체크해제 함수
*/
function configCheckbox() {
  const checkboxEls = document.querySelectorAll("input[type='checkbox']");

  if (primeCheckbox.checked) {
    checkboxEls.forEach((el) => (el.checked = true));
  } else {
    checkboxEls.forEach((el) => (el.checked = false));
  }
}

/*
  모든 리스트 삭제 함수
*/
function deleteEveryCheckedList() {
  if (!employeeArr.length) {
    sendToast("삭제할 프로필이 없습니다", "error");
    return;
  }
  const decision = confirm("정말 선택한 프로필들을 삭제하시겠습니까?");
  if (!decision) return;
  const checkboxEls = document.querySelectorAll("input[type='checkbox']");

  for (let i = 1; i < checkboxEls.length; i++) {
    const temp = JSON.parse(checkboxEls[i].dataset.obj);
    employeeArr = employeeArr.filter((el) => el.employeeID !== temp.employeeID);

    const painted = checkboxEls[i].closest("article");
    painted.remove();
  }
  saveLocalStorage();
  checkEmpTotalNum();
  checkboxEls[0].checked = false;
  sendToast("선택한 프로필들을 삭제하였습니다.", "success");
}

console.log("!!");
getUserName();
function getUserName() {
  console.log("!!");
  const userName = localStorage.getItem("UserDisplayName");
  const greetingEl = document.querySelector(".header-userinfo_greeting");
  greetingEl.innerText = `안녕하세요 ${userName} 님`;
}

/*
  addEventListener들 모음
*/
mainAddBtnEl.addEventListener("click", openPopup); //팝업 켜기
popUpCloseBtnEl.addEventListener("click", closePopup); //팝업 닫기
dimEl.addEventListener("click", closePopup); //딤 클릭으로 팝업 닫기
popupCancelBtnEl.addEventListener("click", closePopup); //취소버튼으로 팝업 닫기
primeCheckbox.addEventListener("click", configCheckbox);
delBtnEl.addEventListener("click", deleteEveryCheckedList);
