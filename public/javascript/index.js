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

function memberList() {
  const container = document.querySelector(".container");
  db.collection("product")
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        container.innerHTML += `<ul class="list__container detail">
          <li class="list__member__check">
            <input class="etc__check" type="checkbox" id="${doc.id}"/>
          </li>
          <li class="list__member select"> 
            <img
              class="list__member__img"
              src="${doc.data().이미지}"
              alt="프로필 사진"
              id="${doc.id}"
            />
          </li>
          <li class="list__member select" id="${doc.id}">${doc.data().이름}</li>
          <li class="list__member select" id="${doc.id}">${doc.data().성별}</li>
          <li class="list__member select" id="${doc.id}">${doc.data().생일}</li>
          <li class="list__member select" id="${doc.id}">${
          doc.data().말버릇
        }</li>
          <li class="list__member select" id="${doc.id}">${doc.data().취미}</li>
        </ul>`;
        const members = document.querySelectorAll(".list__member.select");
        memberClick(members);
      });
    });
}
memberList();

function memberClick(members) {
  members.forEach((member) => {
    member.addEventListener("click", (event) => {
      const id = event.target.id;
      window.location.href = "./detail.html?id=" + id;
    });
  });
}
