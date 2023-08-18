import { getUserAlbumData } from "../../s3/viewUserData";
import { generateAlbumImg } from "../../s3/viewUserData";
import { generateAlbumModal } from "./create-album-modal";
import { listUsers } from "./view-user-page";
import { viewAlbum } from "./view-img-page";
import { viewLoading } from "../controllers/loading.controller";

export const listAlbums = async (userName) => {
  const data = await getUserAlbumData(userName);

  const listTitle = document.getElementById("list-title");
  listTitle.textContent = "Album lists";

  const getBackBtn = document.getElementsByClassName("buttonWrap");
  const backBtns = [...getBackBtn];

  backBtns.forEach((backBtn) => {
    backBtn.innerHTML = "";
    backBtn.display = "none";
    backBtn.classList.add("btn");
    backBtn.style.marginLeft = "auto";
    backBtn.style.marginRight = "auto";

    const backToUserBtn = document.createElement("div");

    backToUserBtn.textContent = "back To User";

    backBtn.append(backToUserBtn);

    backToUserBtn.addEventListener("click", () => {
      listUsers();
    });
  });

  const images = document.getElementById("images");
  const usersEl = document.getElementById("users");
  const viewer = document.getElementById("viewer");

  usersEl.innerHTML = "";
  viewer.innerHTML = "";
  images.innerHTML = "";

  if (usersEl.style.display !== "none") {
    usersEl.style.display = "none";
  }
  if (images.style.display !== "none") {
    images.style.display = "none";
  }
  if (viewer.style.display === "none") {
    viewer.style.display = "grid";
  }

  // console.log(data.Contents[1]);
  data.CommonPrefixes.forEach((commonPrefixe) => {
    const albumName = commonPrefixe.Prefix.split("/")[1];
    const album = document.createElement("div");
    const title = document.createElement("div");

    generateAlbumImg(album, userName, albumName);

    title.textContent = albumName;

    album.append(title);

    album.addEventListener("click", async () => {
      viewLoading(true);
      // debugger;
      await viewAlbum(userName, albumName);
      // debugger;
      viewLoading(false);
      // console.log(albumName);
    });

    viewer.appendChild(album);

    // console.log(commonPrefixe);
  });
  const addAlbumBtn = document.createElement("div");

  addAlbumBtn.classList.add("add-album-btn");
  addAlbumBtn.textContent = "Adding a new Album";

  addAlbumBtn.addEventListener("click", () => {
    const createAlbum = document.getElementById("create-album");

    createAlbum.style.display = "block";
    createAlbum.append(generateAlbumModal(userName));
  });

  viewer.appendChild(addAlbumBtn);
};
