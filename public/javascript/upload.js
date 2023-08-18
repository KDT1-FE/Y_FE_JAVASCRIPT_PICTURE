"use strict";

const firebaseConfig = {
  apiKey: "AIzaSyA1KMljZ1SjEuXDKq5NUOLD3R27e7DVHBU",
  authDomain: "js-service-b5998.firebaseapp.com",
  projectId: "js-service-b5998",
  storageBucket: "js-service-b5998.appspot.com",
  messagingSenderId: "476239971933",
  appId: "1:476239971933:web:5e5234ee4574818c0c6fb4",
  measurementId: "G-FD1WPXWRGL",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const send = document.getElementById("send");
const memberName = document.getElementById("name");
const gender = document.getElementById("gender");
const birthday = document.getElementById("birthday");
const speech = document.getElementById("speech");
const hobby = document.getElementById("hobby");

const fileInput = document.querySelector('input[type="file"]');
const imgContainer = document.querySelector(".img__container img");
fileInput.addEventListener("input", () => {
  if (isImage(fileInput.files[0])) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      imgContainer.src = reader.result;
      console.log(imgContainer);
    });
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    alert("이미지만 업로드 가능합니다.");
    return;
  }
});

function isImage(file) {
  return file.type.indexOf("image") >= 0;
}

send.addEventListener("click", () => {
  if (
    !memberName.value ||
    !gender.value ||
    !birthday.value ||
    !speech.value ||
    !hobby.value
  ) {
    alert("정보를 빠짐없이 입력해주세요");
  } else {
    const imgFile = document.querySelector("#image").files[0];
    if (!imgFile) {
      alert("사진을 업로드해주세요!");
    }
    const storageRef = storage.ref();
    const imgLocation = storageRef.child("image/" + imgFile.name);
    const uploadImg = imgLocation.put(imgFile);

    uploadImg.on(
      "state_changed",
      // 변화시 동작하는 함수
      null,
      // 에러시 동작하는 함수
      (error) => {
        console.error("실패사유는", error);
      },
      // 성공시 동작하는 함수
      () => {
        uploadImg.snapshot.ref.getDownloadURL().then((url) => {
          const save = {
            이름: memberName.value,
            성별: gender.value,
            생일: birthday.value,
            말버릇: speech.value,
            취미: hobby.value,
            이미지: url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };
          db.collection("product")
            .add(save)
            .then((result) => {
              window.location.href = "./index.html";
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  }
});
