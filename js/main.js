const toogleBtn = document.querySelector(".navbar__tooglebtn");

function toggleClassOnElement(element, className) {
  element?.classList.toggle(className);
}

const toggleNavbar = () => {
  toggleClassOnElement(document.querySelector(".navbar__menu"), "active");
  console.log("click");
};

toogleBtn.addEventListener("click", toggleNavbar);

document.getElementById("image").addEventListener("change", function (e) {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(".modal-box__inputImg").innerHTML = `<img src="${e.target.result}" alt="Image Preview" class="preview-image">`;
    };

    reader.readAsDataURL(e.target.files[0]);
  }
});

document.addEventListener("dragstart", function (event) {
  if (event.target.tagName == "IMG") {
    event.preventDefault();
  }
});
