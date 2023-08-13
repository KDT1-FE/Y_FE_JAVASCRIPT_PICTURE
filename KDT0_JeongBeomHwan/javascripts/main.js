const delBtnEl = document.querySelector(".main-toolbar_rightcontainer_buttons .btn-sm.outlined"); // 선택 삭제 버튼
const mainAddBtnEl = document.querySelector(".main-toolbar_rightcontainer_buttons .btn-sm.filled"); //팝업 켜기 버튼

const dimEl = document.querySelector("#DIM"); // DIM요소
const popUpEl = document.querySelector("section.popup-container"); //팝업 요소
const popUpCloseBtnEl = document.querySelector(".popup-header span:last-child");

const popupAddBtnEl = document.querySelector(".popup-buttons .btn-md:last-child");

// 프로필 생성 요청하기
popupAddBtnEl.addEventListener("click", (event) => {
  const popupInputEls = document.querySelectorAll(".popup-contents-container input");
  const [name, email, tel, file] = popupInputEls;
  const popupSelectEls = document.querySelectorAll(".popup-contents-container select");
  const [team, author] = popupSelectEls;

  let flag = true;
  for (let i = 0; i < 3; i++) {
    if (!popupInputEls[i].value) {
      flag = false;
      sendToast("입력하지 않은 항목이 있습니다.", "error");
      break;
    }
  }
  if (flag === false) return;

  sendToast("직원 프로필을 생성하였습니다.", "success"); // 토스트 생성
  paintProfileEl(name.value, team.value, email.value, tel.value, author.value, file.value);
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
  프로필 그리기 함수
*/
const ProfileListContainerEl = document.querySelector(".listtable-tablerows-container");
function paintProfileEl(koName, team, email, tel, author, file) {
  console.log(koName, team, email, tel, author, file);

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
  profileCheckEl.append(checkboxCol);

  const profileCol = document.createElement("div");
  profileCol.classList.add("employeecard-column_profilecard");
  profileCheckEl.append(profileCol);

  const koNameCol = document.createElement("span");
  koNameCol.classList.add(".ko-name");
  koNameCol.innerText = koName;
  nameEl.append(koNameCol);

  const enNameCol = document.createElement("span");
  enNameCol.classList.add(".en-name");
  nameEl.append(enNameCol);

  const emailCol = document.createElement("span");
  emailCol.innerText = email;
  emailEl.append(emailCol);

  const telCol = document.createElement("span");
  telCol.innerText = tel;
  telEl.append(telCol);

  const teamCol = document.createElement("span");
  teamCol.innerText = team;
  teamEl.append(teamCol);

  const authorCol = document.createElement("author");
  authorCol.innerText = author;
  authorEl.append(authorCol);

  const iconModifyCol = document.createElement("span");
  iconModifyCol.classList.add("material-symbols-outlined");
  iconModifyCol.innerText = "edit_note";
  iconModifyCol.addEventListener("click", openPopup);

  const iconDeleteCol = document.createElement("span");
  iconDeleteCol.classList.add("material-symbols-outlined");
  iconDeleteCol.innerText = "delete";
  // iconDeleteCol.addEventListener("click", );

  iconsEl.append(iconModifyCol, iconDeleteCol);

  console.log("PC", profileCardEl);
  console.log("CL", columnEls);

  ProfileListContainerEl.append(profileCardEl);
}

/* 
  팝업 켜기 함수 & 끄기 함수
*/
function openPopup(event) {
  const popupHeaderEl = document.querySelector(".popup-header span:first-child");
  if (event.target === mainAddBtnEl) {
    popupHeaderEl.innerText = "직원 프로필 추가";
  } else {
    popupHeaderEl.innerText = "직원 프로필 변경";
  }
  dimEl.classList.remove("none");
  popUpEl.classList.remove("none");
}
function closePopup() {
  dimEl.classList.add("none");
  popUpEl.classList.add("none");
}

/*
  addEventListener들 모음
*/
mainAddBtnEl.addEventListener("click", openPopup); //팝업 켜기
popUpCloseBtnEl.addEventListener("click", closePopup); //팝업 닫기
dimEl.addEventListener("click", closePopup); //딤 클릭으로 팝업 닫기

// 읽기
// 변경
// 삭제
