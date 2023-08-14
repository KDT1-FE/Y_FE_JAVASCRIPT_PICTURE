import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const imageInputEl = document.getElementById("profilePic");
const registForm = document.querySelector(".regist-form");

// 프로필 이미지가 바뀌면 파이어베이스 Storage에 저장하고 화면에 표시
imageInputEl.addEventListener("change", (event) => {
  const file = document.getElementById("profilePic").files[0];
  const storageRef = ref(storage, "avatar/" + file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(storageRef).then((url) => {
      // 프로필 이미지 url input에 저장
      registForm.elements[1].value = url;

      // 프로필 이미지 변경
      document.getElementById("avatarImg").src = url;
    });
  });
});

// 완료 버튼 누르면 firestore에 회원 정보 저장
registForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "customers"), {
      avatar: registForm.elements[1].value,
      name: registForm.elements[2].value,
      email: registForm.elements[3].value,
      phone: registForm.elements[4].value,
      grade: registForm.elements[5].value,
    });
    location.href = "/";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// input 태그에서 엔터 눌러도 submit 막기
const textInput = document.querySelectorAll(".regist-text-input");
for (const i of textInput) {
  i.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
}
