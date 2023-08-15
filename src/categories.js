import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { appendUsers, initialFetch } from "./displayUserList";

const userListContainer = document.querySelector(".user__list");
const userContainer = document.querySelector(".user__container");

const categoriesContainer = document.createElement("div");
categoriesContainer.className = "user__categories";

const category = document.createElement("select");
category.className = "user__selected-category";

const innerHTML = `
  <option selected>All</option>
  <option value="student">Student</option>
  <option value="manager">Manager</option>
  <option value="educator">Educator</option>
`;

category.innerHTML = innerHTML;

category.addEventListener("input", async () => {
  const selectedCategory = category.value;
  const userRef = collection(db, "users");

  if (selectedCategory === "All") {
    userListContainer.innerHTML = "";
    initialFetch();
    return;
  }

  const q = query(userRef, where("position", "==", selectedCategory));
  const docs = await getDocs(q);

  userListContainer.innerHTML = "";
  appendUsers(docs);
});

categoriesContainer.appendChild(category);
userContainer.insertAdjacentElement("afterbegin", categoriesContainer);
