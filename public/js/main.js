// nav 바 반응형 웹
const toggleBtn = document.querySelector("nav .navbar__toggle-btn");
const menu = document.querySelector("nav .navbar__menu");
const icons = document.querySelector("nav .navbar__icons");

toggleBtn.addEventListener("click", () => {
  console.log("클릭");
  menu.classList.toggle("active");
  icons.classList.toggle("active");
});
