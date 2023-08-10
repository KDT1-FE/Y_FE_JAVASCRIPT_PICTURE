import { uploadImageToStorage, uploadInfoToDatabase } from "./uploadImage";

const addForm = document.querySelector(".form-add");

addForm.addEventListener("submit", async (e) => {
  console.log("form submitted");
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const rank = document.getElementById("rank").value;
  const imageFile = document.getElementById("chooseFile").files[0];

  const imageUrl = await uploadImageToStorage(imageFile);

  const userData = {
    name,
    email,
    rank,
    imageUrl,
  };

  uploadInfoToDatabase(userData);

  addForm.reset();
  document.querySelector(".form__image-box").classList.add("show");
  document.querySelector(".form__image-box").classList.remove("hidden");
  document.querySelector(".form__input-image").classList.add("show");
  document.querySelector(".form__input-image").classList.remove("hidden");
});
