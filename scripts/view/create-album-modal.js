import { addUserAlbum } from "../../s3/handleUserData";
import { listAlbums } from "./view-album-page";

export const generateAlbumModal = (userName) => {
  const createAlbum = document.getElementById("create-album");
  // Create modal container
  const createAlbumModal = document.createElement("div");
  createAlbumModal.className = "create-album__modal";

  // Create label and input
  const albumNameDiv = document.createElement("div");
  const albumNameLabel = document.createElement("label");
  const albumNameInput = document.createElement("input");

  albumNameLabel.textContent = "Album Name";
  albumNameInput.type = "text";

  // input album name event
  let albumTitle;
  albumNameInput.addEventListener("input", (e) => {
    albumTitle = e.target.value;
  });

  albumNameDiv.appendChild(albumNameLabel);
  albumNameDiv.appendChild(albumNameInput);

  // Create buttons
  const buttonsDiv = document.createElement("div");
  const createButton = document.createElement("div");
  const cancelButton = document.createElement("div");

  createButton.className = "btn";
  createButton.id = "create-album-btn";
  createButton.textContent = "CREATE";

  cancelButton.className = "btn-reverse";
  cancelButton.id = "cancel-album-btn";
  cancelButton.textContent = "CANCEL";

  cancelButton.addEventListener("click", () => {
    createAlbum.style.display = "none";
    createAlbumModal.innerHTML = "";
  });

  createButton.addEventListener("click", async () => {
    console.log(albumTitle);
    await addUserAlbum(albumTitle, userName);
    listAlbums(userName);
    createAlbum.style.display = "none";
    createAlbumModal.innerHTML = "";
  });

  buttonsDiv.appendChild(createButton);
  buttonsDiv.appendChild(cancelButton);

  // Append
  createAlbumModal.appendChild(albumNameDiv);
  createAlbumModal.appendChild(buttonsDiv);

  return createAlbumModal;
};
