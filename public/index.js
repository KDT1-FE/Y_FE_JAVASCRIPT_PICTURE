const userAddBtnsEl = document.querySelectorAll("#user-add-btn");
const cancelBtnEl = document.querySelector(".section__user_cancel_btn");
const addBtnEl = document.querySelector(".section__user_add_btn");

const imgEl = document.querySelector(".img_section");
const img_inputEl = document.querySelector(".user_imgInput");
const user_checkboxsEl = document.querySelectorAll(
  ".section__user_checkbox_division[type='checkbox']"
);

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

function readURL(input) {
  if (input.target.files && input.target.files[0]) {
    let reader = new FileReader();

    reader.onload = (e) => {
      imgEl.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(input.target.files[0]);
  }
}
img_inputEl.addEventListener("change", (e) => {
  readURL(e);
});
imgEl.addEventListener("click", () => {
  img_inputEl.click();
});

user_checkboxsEl.forEach((checkbox) => {
  console.log(checkbox);
  checkbox.onchange = (e) => {
    if (e.target.checked) {
      user_checkboxsEl.forEach((outherCheckbox) => {
        if (outherCheckbox !== e.target) {
          outherCheckbox.checked = false;
        }
      });
    }
  };
});
