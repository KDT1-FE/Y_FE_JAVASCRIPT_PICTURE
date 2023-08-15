import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { appendUsers } from "./displayUserList";

const userListContainer = document.querySelector(".user__list");
const searchBtn = document.querySelector(".header__btn-search-user");

searchBtn.addEventListener("click", () => {
  const inputUser = document.querySelector(".header__input-search");
  const name = inputUser.value;
  console.log(name);
  findUser(name);
  inputUser.value = "";
});

async function findUser(name) {
  const userRef = collection(db, "users");
  const userQuery = query(
    userRef,
    where("name", ">=", name),
    where("name", "<=", name + "\uf8ff")
  );
  // const userQuery = query(userRef, where("name", "==", name));
  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot) {
    userListContainer.innerHTML = "";
    appendUsers(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  } else {
    return null;
  }
}
