import { uploadImageToStorage, uploadInfoToDatabase } from "./uploadImage";

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  uploadImageToStorage();
  uploadInfoToDatabase();
});
