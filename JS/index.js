// Import the functions you need from the SDKs you need
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtvcoHvSvbCmBnQvAsFuX5n4Wota26vUU",
  authDomain: "hr-service-ce682.firebaseapp.com",
  projectId: "hr-service-ce682",
  storageBucket: "hr-service-ce682.appspot.com",
  messagingSenderId: "193484491335",
  appId: "1:193484491335:web:b455f51ade90f2d7ddbf62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const open = document.querySelector("#open-dialog");
const add = document.querySelector(".add-dialog");
const close = document.querySelector(".close-modal");
const profileTable = document.querySelector("#profile-table");

document.querySelector(".logo").addEventListener("click", () => {
  location.reload();
});

open.addEventListener("click", () => {
  add.showModal();
});

close.addEventListener("click", () => {
  add.close();
});

document
  .querySelector(".profile-submit")
  .addEventListener("click", async function () {
    const imgFile = document.querySelector(".input-img").files[0];
    const imgLocation = ref(storage, "images/" + imgFile.name);
    const profileContain = {
      name: document.querySelector(".name").value,
      phoneNum: document.querySelector(".phone-num").value,
      email: document.querySelector(".mail").value,
      position: document.querySelector(".position").value,
      date: new Date(),
    };
    const imgUpload = await uploadBytes(imgLocation, imgFile);
    const imgUrl = await getDownloadURL(imgUpload.ref);
    const addUrl = {
      img: imgUrl,
    };
    Object.assign(profileContain, addUrl);

    await addDoc(collection(db, "profiles"), profileContain);
    location.reload();
  });

let template = `
<div class="profile-card">
  <span> <img class="profile-image" src="{{profile_image}}" alt="no img"></span>
  <div class="info">
  <span>이름 : {{profile_name}}</span>
  <span>전화번호 : {{profile_phoneNum}}</span>
  <span>이메일 : {{profile_mail}}</span>
  <span>직급 : {{profile_position}}</span>
  </div>
</div>  
`;

const q = query(collection(db, "profiles"), orderBy("date"));
let itemNumber = 0;
onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const newProfile = document.createElement("a");
    newProfile.classList.add("item");
    newProfile.setAttribute("href", `./profile.html#item${itemNumber}`); //
    template = template
      .replace("{{profile_image}}", doc.data().img)
      .replace("{{profile_name}}", doc.data().name)
      .replace("{{profile_phoneNum}}", doc.data().phoneNum)
      .replace("{{profile_mail}}", doc.data().email)
      .replace("{{profile_position}}", doc.data().position);
    newProfile.innerHTML = template;
    profileTable.append(newProfile);
    template = template
      .replace(doc.data().img, "{{profile_image}}")
      .replace(doc.data().name, "{{profile_name}}")
      .replace(doc.data().phoneNum, "{{profile_phoneNum}}")
      .replace(doc.data().email, "{{profile_mail}}")
      .replace(doc.data().position, "{{profile_position}}");
    itemNumber++;
  });
});
