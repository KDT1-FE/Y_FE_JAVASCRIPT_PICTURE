import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_R-euRNqGE2pQb_-lfUbNN6dfHILDE1s",
  authDomain: "profilebase-bm0729.firebaseapp.com",
  projectId: "profilebase-bm0729",
  storageBucket: "profilebase-bm0729.appspot.com",
  messagingSenderId: "912453268999",
  appId: "1:912453268999:web:2dd4a7cdca257e18e0dca2",
  measurementId: "G-LSMWWEY4DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersCollectionRef = collection(db, "profiles");
const firebaseApp = getApp();
const storage = getStorage(app);
const storageRef = ref(storage);

const mainDelBtnEl = document.querySelector(".main-toolbar_rightcontainer_buttons .btn-sm.outlined"); // 선택 삭제 버튼
const mainAddBtnEl = document.querySelector(".main-toolbar_rightcontainer_buttons .btn-sm.filled"); //팝업 켜기 버튼
const logoutBtnEl = document.querySelector(".header-userinfo_logout"); //로그아웃 버튼

const dimEl = document.querySelector("#DIM"); // DIM요소
const popUpEl = document.querySelector("section.popup-container"); //팝업 컨테이너
const popUpCloseBtnEl = document.querySelector(".popup-header span:last-child"); //팝업 닫기 버튼
const popupHeaderEl = document.querySelector(".popup-header span:first-child"); //팝업 헤더 제목
const popupAddBtnEl = document.querySelector(".popup-buttons .btn-md:last-child"); //팝업- 저장 버튼
const popupCancelBtnEl = document.querySelector(".popup-buttons .btn-md:first-child"); //팝업 취소 버튼

const ProfileListContainerEl = document.querySelector(".listtable-tablerows-container"); // 프로필이 쌓이는 컨테이너
const primeCheckbox = document.querySelector("input[type='checkbox']"); // 전체 체크박스
const teamFilter = document.querySelector(".main-container_header #filter-teams"); // 팀 선택 드롭다운

let employeeArr = [];

/*
  로그아웃 버튼 눌렀을 때
*/
logoutBtnEl.onclick = () => {
  const check = confirm("정말 로그아웃하시겠어요?");
  if (!check) return;
  auth
    .signOut()
    .then(() => {
      // 로그아웃 성공
      console.log("로그아웃되었습니다.");
      // 여기에서 로그아웃 후 필요한 동작을 추가로 수행할 수 있습니다.
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // 로그아웃 실패
      console.error("로그아웃 중 에러가 발생했습니다:", error);
    });
};

// 프로필 생성하기 버튼 클릭 시
popupAddBtnEl.addEventListener("click", (event) => {
  const popupInputEls = document.querySelectorAll(".popup-contents-container input");
  const [koName, enName, email, tel, file] = popupInputEls;
  const popupSelectEls = document.querySelectorAll(".popup-contents-container select");
  const [team, author] = popupSelectEls;

  let extension = file.value.split(".").slice(-1)[0];

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

  if (!confirmInputAll(popupInputEls)) return; //모든 입력값을 다 입력했는지 체크
  if (!confirmKorAlp(employeeProfileCard.employeeKoName)) return; // 한글 입력란에 한글만 있는지 체크
  if (employeeProfileCard.employeeEnName.length && !confirmEngAlp(employeeProfileCard.employeeEnName)) return; // 영어 입력란에 영어만 있는지 체크
  if (!confirmEmail(employeeProfileCard.employeeEmail)) return; // 이메일 형식이 맞는지 체크
  if (!confirmTel(employeeProfileCard.employeeTel)) return; // 연락처 형식이 맞는지 체크

  if (employeeProfileCard.employeeEnName) {
    employeeProfileCard.employeeEnName = makePascal(employeeProfileCard.employeeEnName); // 영어 첫문자만 대문자, 나머지 소문자로 만듦
    employeeProfileCard.employeeTel = makeTelForm(employeeProfileCard.employeeTel);
  }
  employeeProfileCard.employeeTel = makeTelForm(employeeProfileCard.employeeTel);

  if (popupHeaderEl.innerText === "직원 프로필 추가" && !checkValid(employeeProfileCard)) {
    sendToast("동일한 연락처 혹은 이메일을 사용하는 사용자가 있습니다.", "error");
    return;
  }

  if (file.value) {
    const sizeChecked = checkFileSize(file.files[0].size);
    if (!sizeChecked) {
      sendToast("3MB 이하의 이미지만 추가 가능합니다.", "error");
      return;
    }
    let storageRef;
    if (popupHeaderEl.innerText === "직원 프로필 추가") {
      storageRef = ref(storage, `images/${employeeProfileCard.employeeID}.${extension}`);
    } else {
      let temp = JSON.parse(popupAddBtnEl.dataset.obj);
      storageRef = ref(storage, `images/${temp.employeeID}.${extension}`);
    }

    uploadBytes(storageRef, file.files[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  //새로 만드는 녀석인지 변경하는 녀석인지 알아내기
  if (popupHeaderEl.innerText === "직원 프로필 추가") {
    //새로 만드는 녀석 플로우
    employeeArr.push(employeeProfileCard);
    checkEmpTotalNum();
    saveLocalStorage();

    console.log(`${employeeProfileCard.employeeID}`, "ID");
    const docRef = doc(db, "profiles", `${employeeProfileCard.employeeID}`);
    setDoc(docRef, employeeProfileCard);

    paintProfileEl(employeeProfileCard, true);
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
    console.log(`${temp.employeeID}`, "ID");
    const docRef = doc(db, "profiles", `${temp.employeeID}`);
    setDoc(docRef, employeeProfileCard);

    ProfileListContainerEl.replaceChildren();
    loadLocalStorage();

    sendToast("해당 직원 프로필을 변경하였습니다.", "success"); // 토스트 생성
  }

  popupInputEls.forEach((el) => (el.value = "")); // 입력 값 지우기
  closePopup();
  console.log("전송 완료!");
});

/*
  모든 필수 입력값을 다 기입했는지 체크하는 함수
*/
function confirmInputAll(popupInputEls) {
  let flag = true;
  for (let i = 0; i < 4; i++) {
    if (i === 1) continue;
    if (!popupInputEls[i].value) {
      flag = false;
      sendToast("입력하지 않은 항목이 있습니다.", "error");
      break;
    }
  }
  return flag;
}

/*
  한글 이름에 한글만 있는지 체크 함수
*/
function confirmKorAlp(koName) {
  const korAlp = /^[가-힣|]+$/;
  let flag = true;
  if (!korAlp.test(koName)) {
    flag = false;
    sendToast("한글이름란에는 자모 조합 한글만 입력 가능합니다", "error");
  }
  return flag;
}

/*
  영어 이름에 영어만 있는지 체크 함수
*/
function confirmEngAlp(enName) {
  const engAlp = /^[a-z|A-Z]+$/;
  let flag = true;
  if (!engAlp.test(enName)) {
    flag = false;
    sendToast("영어이름란에는 영어만 입력 가능합니다", "error");
  }
  return flag;
}

/*
  영어 이름 맨 앞자리만 대문자, 나머지 소문자로 만들기 함수
*/
function makePascal(enName) {
  let first = enName[0].toUpperCase();
  let rest = enName.slice(1).toLowerCase();
  return first + rest;
}

/*
  연락처 '-' 넣어주기 함수
*/
function makeTelForm(tel) {
  return `${tel.slice(0, 3)}-${tel.slice(3, 7)}-${tel.slice(7)}`;
}

/*
  파일 사이즈 제한 체크 함수
*/
function checkFileSize(fileSize) {
  console.log(fileSize, "파일 사이즈");
  return fileSize > 3 * 1024 * 1024 ? false : true;
}

/*
  이메일 형식 체크 함수
*/
function confirmEmail(email) {
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let flag = true;
  if (!emailRegex.test(email)) {
    sendToast("이메일 형식이 올바르지 않습니다", "error");
    flag = false;
  }
  return flag;
}

/*
  연락처 형식 체크 함수 & '-'추가
*/
function confirmTel(tel) {
  let flag = true;
  if (parseInt(tel) === NaN) {
    flag = false;
  } else if (tel.length < 10 || tel.length > 11) {
    flag = false;
  } else if (tel.slice(0, 3) !== "010") {
    flag = false;
  }
  if (!flag) sendToast("연락처 형식이 올바르지 않습니다", "error");
  return flag;
}

/*
  이메일과 연락처 유일성 체크 함수
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
  if (employeeArr.length) {
    employeeArr.forEach((item) => paintProfileEl(item));
    checkEmpTotalNum();
  } else {
    getDocs(usersCollectionRef)
      .then((querySnapshot) => {
        sendToast("서버에서 데이터를 불러왔습니다.", "success");
        querySnapshot.forEach((doc) => {
          employeeArr.push(doc.data());
          paintProfileEl(doc.data());
        });
      })
      .then(() => {
        saveLocalStorage();
        checkEmpTotalNum();
      })
      .catch(() => console.log("nothing in the both Local and Firestore"));
  }
}

/*
  프로필 그리기 함수
*/
function paintProfileEl(employeeProfileCard, newType) {
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

  const profileCol = document.createElement("img");
  profileCol.classList.add("employeecard-column_profilecard");

  let extension = employeeProfileCard.employeeFile.split(".").slice(-1)[0];
  if (employeeProfileCard.employeeFile && newType) {
    profileCol.addEventListener("mouseenter", expandImage);
    profileCol.addEventListener("mouseleave", hideImage);
    setTimeout(() => {
      getDownloadURL(ref(storage, `images/${employeeProfileCard.employeeID}.${extension}`))
        .then((url) => {
          profileCol.src = url;
        })
        .catch((error) => {
          // Handle any errors
          console.log("no image");
        });
    }, 2000);
  } else if (employeeProfileCard.employeeFile) {
    profileCol.addEventListener("mouseenter", expandImage);
    profileCol.addEventListener("mouseleave", hideImage);
    getDownloadURL(ref(storage, `images/${employeeProfileCard.employeeID}.${extension}`))
      .then((url) => {
        profileCol.src = url;
      })
      .catch((error) => {
        // Handle any errors
        console.log("no image");
      });
  } else {
    profileCol.src = "../images/noimage.png";
  }

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
  이미지 미리보기 함수
*/
function previewImage(event) {
  const imagePreviewEl = document.querySelector(".profile-image");
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "100%";

      imagePreviewEl.innerHTML = ""; // Clear any previous preview
      imagePreviewEl.appendChild(img);
    };

    reader.readAsDataURL(selectedFile);
  }
}

/* 
  팝업 켜기 함수
*/
function openPopup(event) {
  const popupInputEls = document.querySelectorAll(".popup-contents-container input");
  const [koName, enName, email, tel, file] = popupInputEls;
  const popupSelectEls = document.querySelectorAll(".popup-contents-container select");
  const [team, author] = popupSelectEls;

  popupInputEls.forEach((item) => (item.value = ""));
  team.value = "개발";
  author.value = "직원";

  file.addEventListener("change", previewImage);

  if (event.target === mainAddBtnEl) {
    popupHeaderEl.innerText = "직원 프로필 추가";
  } else {
    popupHeaderEl.innerText = "직원 프로필 변경";
    popupAddBtnEl.dataset.obj = event.target.dataset.obj;
  }

  if (event.target.dataset.obj) {
    // 수정하는 경우 데이터들 다 불러오기
    let temp = JSON.parse(event.target.dataset.obj);

    koName.value = temp.employeeKoName;
    enName.value = temp.employeeEnName;
    email.value = temp.employeeEmail;
    tel.value = temp.employeeTel.includes("-") ? temp.employeeTel.split("-").join("") : temp.employeeTel; // - 연락처 빼고 불러오기
    team.value = temp.employeeTeam;
    author.value = temp.employeeAuthor;

    previewModifying(event.target);
  }

  dimEl.classList.remove("none");
  popUpEl.classList.remove("none");
}
/* 
  팝업 끄기 함수
*/
function closePopup() {
  const file = document.querySelector("input[type='file']");
  const imagePreviewEl = document.querySelector(".profile-image");
  imagePreviewEl.innerHTML = "";
  file.removeEventListener("change", previewImage);
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

  employeeArr = employeeArr.filter((item) => item.employeeID !== temp.employeeID);
  saveLocalStorage();

  // 삭제할 문서의 참조 생성
  const docRef = doc(db, "profiles", `${temp.employeeID}`);

  // 문서 삭제
  deleteDoc(docRef)
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error deleting document:", error);
    });

  if (temp.employeeFile) {
    let extension = temp.employeeFile.split(".").slice(-1)[0];
    const imgRef = ref(storage, `images/${temp.employeeID}.${extension}`);
    deleteObject(imgRef)
      .then(() => {
        console.log("image Deleted");
      })
      .catch((error) => {
        console.log("image not Deleted");
      });
  }

  checkEmpTotalNum();
  sendToast("해당 프로필이 삭제되었습니다.", "success");
}

/*
  직원 수 카운터 함수
*/
function checkEmpTotalNum() {
  const empTotalNumEl = document.querySelector(".main-toolbar_desc span:last-child");
  empTotalNumEl.innerHTML = `  ${employeeArr.length} 명`;
  checkEmptyList();
}

/*
  비었나 안 비었나 체크 함수
*/
function checkEmptyList() {
  const EmptyListEl = document.querySelector(".no-profile");
  if (employeeArr.length) {
    EmptyListEl.classList.add("none");
  } else {
    EmptyListEl.classList.remove("none");
  }
}

/*
  수정 시 이미지 불러오기 함수
*/
function previewModifying(target) {
  const listImg = target.closest("article").querySelector("img");
  const imagePreviewEl = document.querySelector(".profile-image");
  const img = document.createElement("img");
  img.src = listImg.src;
  img.style.maxWidth = "100%";
  imagePreviewEl.append(img);
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
  여러 개의(혹은 모든) 리스트 삭제 함수
*/
function deleteEveryCheckedList() {
  const checkboxEls = document.querySelectorAll("input[type='checkbox']");
  const checkArr = Array.from(checkboxEls);
  console.log(checkboxEls);
  if (checkboxEls.length === 1 || !checkArr.filter((el) => el.checked).length) {
    sendToast("삭제할 프로필이 없습니다", "error");
    return;
  }
  const decision = confirm("정말 선택한 프로필들을 삭제하시겠습니까?");
  if (!decision) return;
  console.log("선택 삭제 중");
  for (let i = 1; i < checkboxEls.length; i++) {
    if (!checkboxEls[i].checked) continue;
    const temp = JSON.parse(checkboxEls[i].dataset.obj);
    console.log(temp.employeeID);

    employeeArr = employeeArr.filter((el) => el.employeeID !== temp.employeeID);

    // 삭제할 문서의 참조 생성
    const docRef = doc(db, "profiles", `${temp.employeeID}`);

    // 문서 삭제
    deleteDoc(docRef)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });

    if (temp.employeeFile) {
      let extension = temp.employeeFile.split(".").slice(-1)[0];
      const imgRef = ref(storage, `images/${temp.employeeID}.${extension}`);
      deleteObject(imgRef)
        .then(() => {
          console.log("image Deleted");
        })
        .catch((error) => {
          console.log("image not Deleted");
        });
    }

    const painted = checkboxEls[i].closest("article");
    painted.remove();
  }
  saveLocalStorage();
  checkEmpTotalNum();
  checkboxEls[0].checked = false;
  sendToast("선택한 프로필들을 삭제하였습니다.", "success");
}

/*
  유저 이름 가져오기 함수
*/
getUserName();
function getUserName() {
  const userName = localStorage.getItem("UserDisplayName");
  const greetingEl = document.querySelector(".header-userinfo_greeting");
  greetingEl.innerText = `안녕하세요 ${userName} 님`;
}

function expandImage(event) {
  const IMG = document.getElementById("IMGPREVIEW");
  const DIM = document.getElementById("DIM");
  IMG.src = event.target.src;
  IMG.style.display = "block";
  DIM.classList.remove("none");
}
function hideImage(event) {
  const IMG = document.getElementById("IMGPREVIEW");
  IMG.src = "";
  IMG.style.display = "none";
  DIM.classList.add("none");
}

function sortTeam(event) {
  const selVal = event.target.value;
  const lists = document.querySelectorAll("article");

  lists.forEach((el) => {
    const teamVal = el.querySelector(".employeecard-column.team span");
    if (selVal === "전체") {
      el.classList.remove("none");
    } else if (teamVal.innerText !== selVal) {
      el.classList.add("none");
    } else {
      el.classList.remove("none");
    }
  });
}

const searchEl = document.querySelector("input[type='search']");
searchEl.addEventListener("change", searchName);

function searchName(event) {
  console.log("진행 중?");
  let word = event.target.value.toLowerCase();
  const lists = document.querySelectorAll("article");

  lists.forEach((el) => {
    const korVal = el.querySelector(".employeecard-column.name span.ko-name").innerText.toLowerCase();
    const engVal = el.querySelector(".employeecard-column.name span.en-name").innerText.toLowerCase();
    const teamFilterVal = teamFilter.value;

    if (korVal.includes(word) || engVal.includes(word)) {
      el.classList.remove("search-none");
    } else {
      el.classList.add("search-none");
    }
  });
}

/*
  addEventListener들 모음
*/
mainAddBtnEl.addEventListener("click", openPopup); //팝업 켜기
popUpCloseBtnEl.addEventListener("click", closePopup); //팝업 닫기
dimEl.addEventListener("click", closePopup); //딤 클릭으로 팝업 닫기
popupCancelBtnEl.addEventListener("click", closePopup); //취소버튼으로 팝업 닫기
primeCheckbox.addEventListener("click", configCheckbox); // 모두 선택하기, 모두 해제하기
mainDelBtnEl.addEventListener("click", deleteEveryCheckedList); // 모두 삭제하기
teamFilter.addEventListener("change", sortTeam); // 팀별로 나눠보기
