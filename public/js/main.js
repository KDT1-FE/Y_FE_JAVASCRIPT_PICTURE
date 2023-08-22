const toogleBtn = document.querySelector(".navbar__tooglebtn");

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
