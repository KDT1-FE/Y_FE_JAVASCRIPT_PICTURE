import { deleteUser } from "./deleteUser";

const userListContainer = document.querySelector(".user__list");

userListContainer.addEventListener("click", (e) => {
  const menuToggle = e.target.closest(".user__menu-icon");

  if (menuToggle) {
    const menuItems = menuToggle.nextElementSibling;
    menuItems.classList.toggle("hidden");

    const userId = menuToggle.closest(".user__user").getAttribute("data-id");
    const deleteBtn = menuItems.querySelector(".user__menu-delete");
    deleteBtn.addEventListener("click", () => deleteUser(userId));
  }
});
