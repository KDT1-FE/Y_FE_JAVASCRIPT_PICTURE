const userAddBtnsEl = document.querySelectorAll("#user-add-btn");
const cancelBtnEl = document.querySelector(".section__user_cancel_btn");
const addBtnEl = document.querySelector(".section__user_add_btn");

userAddBtnsEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const userAddForm = document.querySelector(".section__user-add-box");
    userAddForm.style.display = "block";
  });
});
cancelBtnEl.addEventListener("click", () => {
  const userAddForm = document.querySelector(".section__user-add-box");
  userAddForm.style.display = "none";
});
window.addEventListener("click", (event) => {
  const userAddForm = document.querySelector(".section__user-add-box");
  if (event.target === userAddForm) {
    userAddForm.style.display = "none";
  }
});
