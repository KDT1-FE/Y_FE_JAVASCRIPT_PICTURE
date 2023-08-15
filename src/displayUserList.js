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

const USER_FETCH_SIZE = 8;
let lastVisible;
let allUsers = [];
const userRef = collection(db, "users");
const userQuery = query(userRef, orderBy("name"), limit(USER_FETCH_SIZE));

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

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      nextFetch();
    }
  });
});

export async function initialFetch() {
  const first = await getDocs(userQuery);
  appendUsers(first);
  lastVisible = first.docs[first.docs.length - 1];

  observer.observe(scrollEnd);
}

async function nextFetch() {
  const nextQuery = query(
    userRef,
    orderBy("name"),
    startAfter(lastVisible),
    limit(USER_FETCH_SIZE)
  );

  const next = await getDocs(nextQuery);
  lastVisible = next.docs[next.docs.length - 1];

  if (!lastVisible) {
    observer.unobserve(scrollEnd);
  } else {
    appendUsers(next);
  }
}

const unsub = onSnapshot(userRef, (snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
});

homeBtn.addEventListener("click", () => {
  userListContainer.innerHTML = "";
  initialFetch();
});

initialFetch();
