import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { showPreview } from "./js/showPreview.js";
import * as addModal from "./js/addModal.js";
import * as addProfileCard from "./js/addProfileCard.js";
// import dotenv from "dotenv";
// dotenv.config();

export { imgFileInput, firebaseConfig, app, storage, db };

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSbuttonenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyBXVgQW2Xq5fE1SvaVVutpTgX_6ZaotQhQ",
  authDomain: "photo-management-service.firebaseapp.com",
  projectId: "photo-management-service",
  storageBucket: "photo-management-service.appspot.com",
  messagingSbuttonenderId: "110781159358",
  appId: "1:110781159358:web:e9b8fbdc3e60c979178bef",
  measurementId: "G-E657JQPN7T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

//선택 이미지 preview 띄우기
const imgFileInput = document.getElementById("avatar");
imgFileInput.addEventListener("change", showPreview);

//저장 버튼 : 텍스트&이미지url -> db 업로드 && 이미지 -> storage 업로드
document
  .querySelector(".btn__upload")
  .addEventListener("click", async function () {
    URL.revokeObjectURL(document.querySelector(".preview").src);
    const profileContent = {
      name: document.querySelector(".profile__name").value,
      position: document.querySelector(".profile__position").value,
      github: document.querySelector(".profile__github").value,
      email: document.querySelector(".profile__email").value,
      introduce: document.querySelector(".profile__introduce").value,
      date: Timestamp.fromDate(new Date()),
    };
    if (
      !(
        profileContent.name &&
        profileContent.position &&
        profileContent.github.includes("github.com/") &&
        profileContent.email.includes(".com") &&
        imgFileInput &&
        imgFileInput.files.length > 0
      )
    ) {
      const githubInput = document.querySelector(".profile__github");
      const emailInput = document.querySelector(".profile__email");
      const modalLabel = document.querySelector(".image label");
      const modalInputs = document.querySelectorAll(
        ".input-profile-grid input"
      );
      if (imgFileInput.files.length <= 0) {
        modalLabel.style.backgroundColor = "#ff692480";
      } else if (!profileContent.github.includes("github.com/")) {
        githubInput.value = "";
        githubInput.style.backgroundColor = "#ff692480";
        githubInput.focus();
      } else if (!profileContent.email.includes(".com")) {
        githubInput.style.backgroundColor = "white";
        emailInput.value = "";
        emailInput.style.backgroundColor = "#ff692480";
        emailInput.focus();
      } else {
        emailInput.style.backgroundColor = "white";
        modalInputs.forEach((item) => {
          if (item.value <= 0) {
            item.style.backgroundColor = "#ff692480";
          }
        });
      }
    } else {
      try {
        const imgFile = imgFileInput.files[0];
        const storageRef = ref(
          storage,
          "image/" + Timestamp.fromDate(new Date()) + imgFile.name
        );
        await uploadBytes(storageRef, imgFile);
        const url = await getDownloadURL(storageRef);
        const toSave = {
          image: url,
        };
        const profileContentWithUrl = Object.assign({}, profileContent, toSave);
        await addDoc(collection(db, "profiles"), profileContentWithUrl);
        window.location.href = "/";
        console.log("Document successfully written!");
      } catch {
        (error) => {
          console.error("Error writing document: ", error);
        };
      }
    }
  });
