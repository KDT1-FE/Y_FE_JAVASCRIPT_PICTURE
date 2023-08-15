import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const userListContainer = document.querySelector(".user__list");

userListContainer.addEventListener("click", (e) => {
  const menuToggle = e.target.closest(".user__menu-icon");

  if (menuToggle) {
    const menuItems = menuToggle.nextElementSibling;
    const userId = menuToggle.closest(".user__user").getAttribute("data-id");
    const deleteBtn = menuItems.querySelector(".user__menu-delete");
    deleteBtn.addEventListener("click", () => deleteUser(userId));
  }
});
// 왜 이건 onSnapshot이 바로 실행되지?
async function deleteUser(userId) {
  await deleteDoc(doc(db, "users", userId));
}
