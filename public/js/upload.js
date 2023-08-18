import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  query,
  collection,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  getDocs,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

var firebaseConfig = {
  apiKey: "AIzaSyDH41YTt_vxlfIELSOXrCpk96aUsBvmvOU",
  authDomain: "cupid-32b7f.firebaseapp.com",
  projectId: "cupid-32b7f",
  storageBucket: "cupid-32b7f.appspot.com",
  messagingSenderId: "102484094770",
  appId: "1:102484094770:web:f355446e96d81a1226f12b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

document
  .getElementById("submitBtn")
  .addEventListener("click", async function () {
    await localstorageUpload(); // localstorageUpload() 함수의 비동기 작업이 끝날 때까지 기다림

    // localstorageUpload() 함수의 작업이 끝난 후에 페이지 전환을 수행합니다.
  });

//form 데이터 localStorage 저장 후 반환
async function localstorageUpload() {
  //input에서 선택한 파일 찾는 법

  var file = document.querySelector("#chooseFile").files[0];
  console.log("ddd" + file);
  const locationUrl = await uploadImage(file);
  console.log(locationUrl);
  async function uploadImage(file) {
    const storageRef = ref(storage, "images/" + file.name);
    const uploadRef = await uploadBytes(storageRef, file).then(
      (snapshot) => snapshot.ref
    );
    const location = await getDownloadURL(uploadRef).then(
      (downloadUrl) => downloadUrl
    );
    return location;
  }

  // Event.preventDefault();
  const form = document.getElementById("form");
  const formData = new FormData(form);

  console.log(formData);
  // FormData 객체의 값을 일반 객체로 변환
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  formDataObject.url = locationUrl;
  console.log(formDataObject);

  // // 전에 저장된 데이터의 개수 가져오기
  const storedKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith("user-info")
  );
  const dataCount = storedKeys.length;

  // // 새로운 키 생성
  const newkey = `user-info${dataCount + 1}`;
  console.log(newkey);

  // localStorage에 데이터 저장
  localStorage.setItem(newkey, JSON.stringify(formDataObject));
}

// 사진 업로드 클릭시 미리보기 구현 코드
const inputImage = document.getElementById("chooseFile");
inputImage.addEventListener("change", (e) => {
  readURL(e.target); // chooseFile 의 e를 readURL로 전달
});

// 파일 업로드 클릭했을 때 미리보기 구현
function readURL(input) {
  // 인풋 태그에 파일이 있는 경우
  if (input.files && input.files[0]) {
    console.log("이미지 담김");
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e);
      const previewImg = document.getElementById("preview");

      if (previewImg) {
        previewImg.src = e.target.result;
      } else {
        console.log("미리보기 이미지 요소를 찾을 수 없습니다.");
      }
      previewImg.style.display = "block";
    };

    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0]);
  } else {
    console.log("파일 안담김");
    document.getElementById("preview").src = "";
  }
}
