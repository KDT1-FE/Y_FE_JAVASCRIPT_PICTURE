import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXVgQW2Xq5fE1SvaVVutpTgX_6ZaotQhQ",
  authDomain: "photo-management-service.firebaseapp.com",
  projectId: "photo-management-service",
  storageBucket: "photo-management-service.appspot.com",
  messagingSbuttonenderId: "110781159358",
  appId: "1:110781159358:web:e9b8fbdc3e60c979178bef",
  measurementId: "G-E657JQPN7T",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//profile카드 추가하기 관련 선언
const profileContainer = document.querySelector(".profile-container");

function createProfileElement(data) {
  const template = `
    <div class="profile-card">
      <img class="profile-image" src="${data.image}" alt="profile image">
      <div class="text-container">
        <h1>${data.name}</h1>
        <span class="subtitle">🌞 POSITION</span>
        <span>${data.position}</span>
        <span class="subtitle">🔥 GITHUB</span>
        <span>${data.github}</span>
        <span class="subtitle">📧 EMAIL</span>
        <span>${data.email}</span>
      </div>
    </div>
  `;
  return template;
}

//profile카드 추가하기
const profileCollection = query(collection(db, "profiles"), orderBy("date"));
let itemNumber = 0;
onSnapshot(profileCollection, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const newProfile = document.createElement("a");
    newProfile.classList.add("item");
    newProfile.setAttribute(
      "href",
      `../pages/moreInfo/moreInfo.html#item${itemNumber}`
    );

    const profileData = {
      image: doc.data().image,
      name: doc.data().name,
      position: doc.data().position,
      github: doc.data().github,
      email: doc.data().email,
    };
    newProfile.innerHTML = createProfileElement(profileData);
    profileContainer.append(newProfile);

    itemNumber++;
  });
  //item 개수대로 grid css 제어
  const items = document.querySelectorAll(".item");
  const itemLength = items.length;

  items.forEach((item, index) => {
    const startRow = index + 1;
    const endRow = index + 3;

    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .item:nth-child(${index + 1}) {
        grid-row: ${startRow}/${endRow};
      }
    `;

    document.head.appendChild(styleTag);
  });
});
