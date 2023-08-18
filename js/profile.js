import { getStorage, deleteObject, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore, getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";

// const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const documentId = urlParams.get("documentId");

  try {
    const docRef = doc(db, "database", documentId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();

      // 페이지 내 요소에 데이터 적용
      const profileImgElement = document.getElementById("profile-img");
      profileImgElement.src = data.profileImg;

      const nameInput = document.getElementById("name");
      nameInput.value = data.name;

      const emailInput = document.getElementById("email");
      emailInput.value = data.email;

      const phoneInput = document.getElementById("phone");
      phoneInput.value = data.phone;

      // 이미지 업로드
      const imageUpload = document.getElementById("image-upload");

      imageUpload.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
          const storageRef = ref(storage, `images/${file.name}`);
          const uploadTask = uploadBytes(storageRef, file);

          try {
            const snapshot = await uploadTask;
            const imageRef = ref(storage, `images/${snapshot.metadata.name}`);
            const downloadURL = await getDownloadURL(imageRef);

            // Firestore에 업데이트된 데이터 저장
            const updatedProfileData = {
              profileImg: downloadURL,
              name: nameInput.value,
              email: emailInput.value,
              phone: phoneInput.value,
            };

            await updateDoc(docRef, updatedProfileData);
            window.location.reload();
            console.log("프로필 이미지 업로드 및 데이터 업데이트 완료");
          } catch (error) {
            console.error("이미지 업로드 및 데이터 업데이트 에러:", error);
          }
        }
      });

      // 삭제 버튼 클릭 시 데이터 삭제
      const deleteButton = document.getElementById("delete-btn");
      deleteButton.addEventListener("click", async (event) => {
        const confirmDelete = confirm("정말로 이 데이터를 삭제하시겠습니까?");
        event.preventDefault();
        if (confirmDelete) {
          try {
            await deleteDoc(docRef);
            console.log("데이터 삭제 완료");

            window.location.href = "index.html";
          } catch (error) {
            console.error("데이터 삭제 에러:", error);
          }
        }
      });

      // 저장 버튼 클릭 시 Firestore에 데이터 업데이트
      const saveButton = document.getElementById("save-btn");
      saveButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const updatedProfileData = {
          profileImg: profileImgElement.src,
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
        };
        try {
          await updateDoc(docRef, updatedProfileData);
          console.log("데이터 업데이트 완료");
          window.location.reload();
        } catch (error) {
          console.error("데이터 업데이트 에러:", error);
        }
      });
    } else {
      console.log("문서가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("데이터를 가져오는 중 에러:", error);
  }
});
