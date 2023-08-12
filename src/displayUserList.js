import {
  collection,
  getDocs,
  limit,
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
const scrollEnd = document.querySelector(".scroll-end");

function appendUsers(docs) {
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

async function initialFetch() {
  const first = await getDocs(userQuery);
  // console.log(userQuery);
  // first.forEach((doc) => {
  //   console.log(doc.data());
  // });
  appendUsers(first);
  lastVisible = first.docs[first.docs.length - 1];
  console.log(lastVisible.data());

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
    console.log("unobserved");
    observer.unobserve(scrollEnd);
  } else {
    next.forEach((doc) => {
      console.log(doc.data());
    });
    appendUsers(next);
  }
}

initialFetch();
// import {
//   collection,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   startAfter,
// } from "firebase/firestore";
// import { db } from "./firebase";

// const userListContainer = document.querySelector(".user__list");
// const scrollEnd = document.querySelector(".scroll-end");

// // 이름순 정렬
// const userRef = collection(db, "users");

// // 무한 스크롤 및 로딩 대기
// const SIZE = 8;
// let lastVisible;
// async function fetchUsers(afterDoc) {
//   const options = [userRef, orderBy("name"), limit(SIZE)];

//   if (afterDoc) {
//     options.push(startAfter(afterDoc));
//   }

//   const userQuery = query(...options);
//   const snapshots = await getDocs(userQuery);

//   if (snapshots.size < SIZE) {
//     observer.unobserve(scrollEnd);
//   }

//   snapshots.forEach((doc) => {
//     const userDiv = document.createElement("div");
//     userDiv.className = "user__user";
//     userDiv.dataset.id = doc.id;
//     const user = doc.data();
//     const innerHTML = `
//       <img src=${user.imageUrl} alt="profile image" class="user__image" />
//       <div class="user__info">
//         <h3 class="user__name">${user.name}</h3>
//         <p class="user__email">${user.email}</p>
//         <p class="user__position">${user.position}</p>
//       </div>
//       <div class="user__menu-icon">
//         <i class="fa-solid fa-ellipsis-vertical"></i>
//       </div>
//       <div class="user__menu-items flex-center hidden">
//         <div class="user__menu-edit flex-center pointer">
//           <i class="fa-solid fa-pen"></i>
//         </div>
//         <div class="user__menu-delete flex-center pointer">
//           <i class="fa-solid fa-eraser"></i>
//         </div>
//       </div>
//     `;
//     userDiv.innerHTML = innerHTML;
//     userListContainer.appendChild(userDiv);
//   });

//   lastVisible = snapshots.docs[snapshots.docs.length - 1];
// }

// const observer = new IntersectionObserver(async (entries, observer) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       observer.unobserve(entry.target);
//       fetchUsers(lastVisible);
//     }
//   });
// });

// async function initialize() {
//   await fetchUsers();
//   observer.observe(scrollEnd);
// }

// initialize();
