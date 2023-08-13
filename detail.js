import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

const url = new URL(window.location);
const urlParams = url.searchParams;

const coustomerId = urlParams.get("id");

window.onload = async () => {
  const docRef = doc(db, "customers", coustomerId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const avatarImg = document.getElementById("avatarImg");
    avatarImg.src = docSnap.data().avatar;

    const imgTextInput = document.getElementById("imgTextInput");
    imgTextInput.value = docSnap.data().avatar;

    const nameInput = document.getElementById("nameInput");
    nameInput.value = docSnap.data().name;

    const emailInput = document.getElementById("emailInput");
    emailInput.value = docSnap.data().email;

    const phoneInput = document.getElementById("phoneInput");
    phoneInput.value = docSnap.data().phone;

    const gradeInput = document.getElementById("gradeInput");
    gradeInput.value = docSnap.data().grade;
  }
};

const imageInputEl = document.getElementById("profile_pic");

// 프로필 이미지가 바뀌면 파이어베이스 Storage에 저장하고 화면에 표시
imageInputEl.addEventListener("change", () => {
  const file = document.getElementById("profile_pic").files[0];
  const storageRef = ref(storage, "avatar/" + file.name);
  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then((url) => {
      // 프로필 이미지 url input에 저장
      imgTextInput.value = url;

      // 프로필 이미지 변경
      avatarImg.src = url;

      // 프로필 이미지 삭제 버튼 표시
      document.querySelector(".img-remove-btn").classList.remove("hidden");
    });
  });
});

// 수정 버튼 클릭 시 정보 수정할 수 있도록 변경
const modifyBtn = document.querySelector(".modify");
modifyBtn.addEventListener("click", () => {
  const modifyInput = document.querySelectorAll(".modify-input");
  modifyInput.forEach((i) => {
    i.disabled = false;
  });
  if (imgTextInput.value) {
    document.querySelector(".img-remove-btn").classList.remove("hidden");
  }
  document.querySelector(".modify-submit-btn").classList.remove("hidden");
});

// 프로필 이미지 삭제 기능
const imgRemoveBtn = document.querySelector(".img-remove-btn");
imgRemoveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (imgTextInput.value) {
    imgTextInput.value = "";
    avatarImg.src = "";
  }
});

// 수정 완료 버튼 클릭 시 파이어베이스 데이터 수정 요청
const modifySubmitBtn = document.querySelector(".modify-submit-btn");
modifySubmitBtn.addEventListener("click", async (e) => {
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
