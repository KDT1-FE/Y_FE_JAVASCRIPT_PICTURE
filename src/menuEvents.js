const userListContainer = document.querySelector(".user__list");

userListContainer.addEventListener("click", (e) => {
  const menu = e.target.closest(".user__menu-icon");

  if (menu) {
    const menuIcons = menu.nextElementSibling;
    menuIcons.classList.toggle("hidden");
  }
});
