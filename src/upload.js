import { uploadImageToStorage, uploadInfoToDatabase } from "./uploadImage";

const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
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
});
