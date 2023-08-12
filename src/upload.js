import { onSnapshot } from "./displayUserList";
import { uploadImageToStorage, uploadInfoToDatabase } from "./uploadImage";

const addForm = document.querySelector(".form-add");
const imageInput = document.querySelector(".form__input-image");
const imagePreview = document.querySelector(".form__image-box");

addForm.addEventListener("submit", async (e) => {
  console.log("form submitted");
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const position = document.getElementById("position").value;
  const imageFile = document.getElementById("chooseFile").files[0];

  const imageUrl = await uploadImageToStorage(imageFile);

  const userData = {
    name,
    email,
    position,
    imageUrl,
  };

  uploadInfoToDatabase(userData);

  addForm.reset();
  addForm.classList.add("hidden");
  imageInput.classList.remove("invisible");
  imagePreview.classList.add("hidden");
});
