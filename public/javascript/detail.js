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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화되었다면, 초기화 된 것을 사용함
}

const db = firebase.firestore();
const id = window.location.search.substring(4);

function memberDetail(id) {
  const mainDetail = document.getElementById("main__detail");
  db.collection("product")
    .doc(id)
    .get()
    .then((doc) => {
      mainDetail.innerHTML = `<ul class="detail__container">
          <li class="detail__info">
            <span class="detail__title">이름</span>
            <span class="detail__data">${doc.data().이름}</span>
          </li>
          <li class="detail__info">
            <span class="detail__title">성별</span>
            <span class="detail__data">${doc.data().성별}</span>
          </li>
          <li class="detail__info">
            <span class="detail__title">생일</span>
            <span class="detail__data">${doc.data().생일}</span>
          </li>
          <li class="detail__info">
            <span class="detail__title">말버릇</span>
            <span class="detail__data">${doc.data().말버릇}</span>
          </li>
          <li class="detail__info">
            <span class="detail__title">취미</span>
            <span class="detail__data">${doc.data().취미}</span>
          </li>
        </ul>
        <div class="img__container">
          <img src="${doc.data().이미지}" />
        </div>`;
      const changeContainer = document.querySelector(".change__container");
      const changeBtn = document.querySelector(".main__header__btn");
      changeBtn.addEventListener("click", () => {
        mainDetail.innerHTML = `<ul class="detail__container">
          <li class="detail__info">
            <span class="detail__title">이름</span>
            <input class="input__data name" value="${doc.data().이름}"></input>
          </li>
          <li class="detail__info">
            <span class="detail__title">성별</span>
            <input class="input__data gender" value="${
              doc.data().성별
            }"></input>
          </li>
          <li class="detail__info">
            <span class="detail__title">생일</span>
            <input class="input__data birthday" value="${
              doc.data().생일
            }"></input>
          </li>
          <li class="detail__info">
            <span class="detail__title">말버릇</span>
            <input class="input__data speech" value="${
              doc.data().말버릇
            }"></input>
          </li>
          <li class="detail__info">
            <span class="detail__title">취미</span>
            <input class="input__data hobby" value="${doc.data().취미}"></input>
          </li>
        </ul>
        <div class="img__container">
          <img src="${doc.data().이미지}" />
        </div>
        `;
        changeContainer.innerHTML = ` 
          <div class="input__container">
            <label for="image">사진 업로드</label>
            <input type="file" class="input__data image" id="image"/>
          </div>
          <button class="update__btn">정보 수정</button>
        `;
        const updateBtn = document.querySelector(".update__btn");
        const inputName = document.querySelector(".input__data.name");
        const inputGender = document.querySelector(".input__data.gender");
        const inputBirthday = document.querySelector(".input__data.birthday");
        const inputSpeech = document.querySelector(".input__data.speech");
        const inputHobby = document.querySelector(".input__data.hobby");
        const imgContainer = document.querySelector(".img__container img");
        const fileInput = document.querySelector('input[type="file"]');

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

        updateBtn.addEventListener("click", () => {
          console.log(inputName.value);
          const save = {
            이름: inputName.value,
            성별: inputGender.value,
            생일: inputBirthday.value,
            말버릇: inputSpeech.value,
            취미: inputHobby.value,
            이미지: imgContainer.src,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };
          console.log(save);
          db.collection("product")
            .doc(id)
            .update(save)
            .then(() => {
              window.location.href = "./index.html";
            });
        });
      });
    });
}

memberDetail(id);
