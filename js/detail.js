import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { deleteData } from "./util";

const url = new URL(window.location);
const urlParams = url.searchParams;
const coustomerId = urlParams.get("id");

const avatarImg = document.getElementById("avatarImg");
const imgTextInput = document.getElementById("imgTextInput");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const gradeInput = document.getElementById("gradeInput");

// 페이지 로드 시 고객 정보 표시
window.onload = async () => {
  // 고객 정보 조회
  const docRef = doc(db, "customers", coustomerId);
  await getDoc(docRef).then((docSnap) => {
    document.querySelectorAll(".skeleton").forEach((skeleton) => {
      skeleton.classList.remove("skeleton");
    }); // 값이 존재하면 고객 정보 표시
    if (docSnap.exists()) {
      avatarImg.src = docSnap.data().avatar;
      imgTextInput.value = docSnap.data().avatar;
      nameInput.value = docSnap.data().name;
      emailInput.value = docSnap.data().email;
      phoneInput.value = docSnap.data().phone;
      gradeInput.value = docSnap.data().grade;
    } else {
      alert("존재하지 않는 고객입니다.");
      location.href = "/";
    }
  });
};

const imgRemoveBtn = document.querySelector(".img-remove-btn");

// 프로필 이미지가 바뀌면 파이어베이스 Storage에 저장하고 화면에 표시
const imageInputEl = document.getElementById("profilePic");
imageInputEl.addEventListener("change", () => {
  if (imgTextInput.value) {
    deleteData(imgTextInput.value);
  }
  const file = imageInputEl.files[0];
  const storageRef = ref(storage, "avatar/" + file.name);
  // storage에 사진 저장
  uploadBytes(storageRef, file).then(() => {
    // storage에 저장된 사진 url 가져오기
    getDownloadURL(storageRef).then((url) => {
      // 프로필 이미지 url input에 저장
      imgTextInput.value = url;

      // 프로필 이미지 변경
      avatarImg.src = url;

      // 프로필 이미지 삭제 버튼 표시
      imgRemoveBtn.classList.remove("hidden");
    });
  });
});

const modifyBtn = document.querySelector(".modify");

// 수정관련 버튼 토글 함수
const toggleModifyBtn = () => {
  // input 태그 입력 가능/불가능
  document.querySelectorAll(".modify-input").forEach((i) => {
    if (i.disabled) {
      i.disabled = false;
    } else {
      i.disabled = true;
    }
  });
  // '정보 수정' 버튼 숨기기/보여주기 토글
  modifyBtn.classList.toggle("hidden");
  // 만약 사진 url 값이 있다면 이미지 '삭제하기' 버튼 숨기기/보여주기 토글
  if (imgTextInput.value) {
    imgRemoveBtn.classList.toggle("hidden");
  }
  // '취소하기','수정하기' 버튼 숨기기/보여주기 토글
  document.querySelectorAll(".modifying").forEach((i) => {
    i.classList.toggle("hidden");
  });
};

// '수정하기' 버튼 클릭 시 정보 수정할 수 있도록 변경
modifyBtn.addEventListener("click", () => {
  toggleModifyBtn();
});

// 수정 '취소하기' 버튼 클릭 시 정보 수정할 수 없도록 변경
document.querySelector(".cancel-btn").addEventListener("click", (e) => {
  e.preventDefault();
  toggleModifyBtn();
  imgRemoveBtn.classList.add("hidden");
});

// 프로필 이미지 삭제 기능 ('삭제하기' 버튼)
imgRemoveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteData(imgTextInput.value);
  if (imgTextInput.value) {
    imgTextInput.value = "";
    avatarImg.src = "";
  }
});

// 수정 완료 버튼 클릭 시 파이어베이스 데이터 수정 요청
document.querySelector(".submit-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  await setDoc(doc(db, "customers", coustomerId), {
    avatar: imgTextInput.value,
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    grade: gradeInput.value,
  }).then(() => {
    location.href = "/";
  });
});
