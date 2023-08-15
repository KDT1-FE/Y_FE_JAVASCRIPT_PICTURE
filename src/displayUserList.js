import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "./firebase";

let userLength = 8;
let lastVisible;
const userRef = collection(db, "users");
const userQuery = query(userRef, orderBy("name"), limit(userLength));

const userListContainer = document.querySelector(".user__list");
const homeBtn = document.querySelector(".header__home-btn");
const scrollEnd = document.querySelector(".scroll-end");

export function appendUsers(docs) {
  docs.forEach((doc) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user__user";
    userDiv.dataset.id = doc.id;
    const user = doc.data();
    const innerHTML = `
      <img src=${user.imageUrl} alt="profile image" class="user__image" />
      <div class="user__info">
        <h3 class="user__name">${user.name}</h3>
        <p class="user__email">${user.email}</p>
        <p class="user__position">${user.position}</p>
      </div>
      <div class="user__menu-icon">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <div class="user__menu-items flex-center hidden">
        <div class="user__menu-edit flex-center pointer">
          <i class="fa-solid fa-pen"></i>
        </div>
        <div class="user__menu-delete flex-center pointer">
          <i class="fa-solid fa-eraser"></i>
        </div>
      </div>
    `;
    userDiv.innerHTML = innerHTML;
    userListContainer.appendChild(userDiv);
  });
}

// 옵저버 생성
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      nextFetch();
    }
  });
});

// 첫 8개 리스트 받아오기 및 변경 시 실행
export async function initialFetch() {
  const first = await getDocs(userQuery);
  appendUsers(first);
  lastVisible = first.docs[first.docs.length - 1];

  observer.observe(scrollEnd);
}

// 다음 8개 리스트 받아오기
async function nextFetch() {
  // console.log("lastVisible", lastVisible);
  const nextQuery = query(
    userRef,
    orderBy("name"),
    startAfter(lastVisible),
    limit(userLength)
  );

  const next = await getDocs(nextQuery);
  lastVisible = next.docs[next.docs.length - 1];

  if (!lastVisible) {
    console.log("No more users");
    observer.unobserve(scrollEnd);
    return;
  } else {
    // console.log("lastVisible2", lastVisible);
    appendUsers(next);
    userLength += next.docs.length;
  }
}

// 데이터 바뀔 때마다 실행
export function handleChangeData() {
  const revisedQuery = query(userRef, orderBy("name"), limit(userLength));
  console.log(userLength);

  const unsub = onSnapshot(revisedQuery, (snapshot) => {
    snapshot.forEach((doc) => console.log(doc.data()));
    console.log("onSnapshot");
    userListContainer.innerHTML = "";
    appendUsers(snapshot);
  });
}

// 홈 버튼 눌렀을 때 첫 화면으로
homeBtn.addEventListener("click", () => {
  userListContainer.innerHTML = "";
  initialFetch();
});

// 시작
initialFetch();
handleChangeData();
