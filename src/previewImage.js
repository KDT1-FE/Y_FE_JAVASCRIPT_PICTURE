const imageInput = document.getElementById("chooseFile");
const imageInputBox = document.querySelector(".form__input-image");

imageInput.addEventListener("change", (e) => {
  const imageBox = document.querySelector(".form__image-box");
  const imagePreview = document.querySelector(".form__image-preview");
  // When user input image, it shows image instead of input box
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);

    imageInputBox.classList.remove("show");
    imageInputBox.classList.add("hidden");
    imageBox.classList.remove("hidden");
    imageBox.classList.add("show");
  }
});
