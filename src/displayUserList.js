import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const userListContainer = document.querySelector(".user__list");

// 이름순 정렬
const userRef = collection(db, "users");
const nameOrderQuery = query(userRef, orderBy("name"));

const unsub = onSnapshot(nameOrderQuery, (snapshot) => {
  userListContainer.innerHTML = "";

  snapshot.forEach((doc) => {
    console.log(doc.data(), doc.id);
    const user = doc.data();
    const innerHTML = `
      <div class="user__user" data-id=${doc.id}>
        <img src=${user.imageUrl} alt="profile image" class="user__image" />
        <div class="user__info">
          <h3 class="user__name">${user.name}</h3>
          <p class="user__email show">${user.email}</p>
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
      </div>
    `;

    userListContainer.insertAdjacentHTML("beforeend", innerHTML);
  });
});
