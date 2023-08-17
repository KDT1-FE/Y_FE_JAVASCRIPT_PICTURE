import { getAlbumImgData, imageUpload, deleteImg } from "../../s3/viewUserData";
import { deleteUserAlbum } from "../../s3/handleUserData";
import { listAlbums } from "./view-album-page";

let albumBucketName = import.meta.env.VITE_BUCKET_NAME;

export const viewAlbum = async (userName, albumName) => {
  const data = await getAlbumImgData(userName, albumName);
  // console.log(data);
  const listTitle = document.getElementById("list-title");
  listTitle.textContent = "Photo lists";

  const getBackBtn = document.getElementsByClassName("buttonWrap");

  getBackBtn.innerHTML = "";

  const backBtns = [...getBackBtn];

  backBtns.forEach((backBtn) => {
    backBtn.innerHTML = "";
    backBtn.display = "none";

    backBtn.style.width = "155px";
    backBtn.style.marginTop = "30px";

    const backToAlbumBtn = document.createElement("div");

    backToAlbumBtn.textContent = "back To Albums";

    backBtn.append(backToAlbumBtn);

    backToAlbumBtn.addEventListener("click", () => {
      listAlbums(userName);
    });
  });

  // console.log(data.Contents);
  let bucketUrl = "https://" + albumBucketName;

  const viewer = document.getElementById("viewer");
  const images = document.getElementById("images");

  images.innerHTML = "";

  if (images.style.display === "none") {
    images.style.display = "grid";
  }
  if (viewer.style.display !== "none") {
    viewer.style.display = "none";
  }

  data.Contents.forEach((content) => {
    let photoKey = content.Key;
    let photoUrl =
      bucketUrl +
      "." +
      import.meta.env.VITE_BUCKET_URL +
      "/" +
      encodeURIComponent(photoKey);

    const imgEl = document.createElement("img");
    const imgWrap = document.createElement("div");

    const imgBtnWrap = document.createElement("div");
    const editBtn = document.createElement("div");
    const downBtn = document.createElement("div");

    editBtn.textContent = "Edit";
    editBtn.style.width = "80px";
    editBtn.style.margin = "6px";
    editBtn.style.fontWeight = "bold";
    editBtn.classList.add("btn-reverse");

    downBtn.textContent = "Delete";
    downBtn.style.width = "80px";
    downBtn.style.margin = "6px";
    downBtn.style.fontWeight = "bold";
    downBtn.classList.add("btn");

    downBtn.addEventListener("click", async (e) => {
      const imgArr = photoKey.split("/");
      const n = imgArr.length;
      const img = imgArr[n - 1];

      await deleteImg(userName, albumName, img);

      viewAlbum(userName, albumName);
    });

    imgBtnWrap.style.display = "flex";
    imgBtnWrap.style.alignItems = "center";
    imgBtnWrap.style.justifyContent = "center";

    imgBtnWrap.append(editBtn, downBtn);
    imgEl.src = photoUrl;

    imgWrap.append(imgEl, imgBtnWrap);
    images.appendChild(imgWrap);
    // console.log(photoUrl);
  });

  images.getElementsByTagName("div")[0].setAttribute("style", "display:none;");

  //  Create input img box
  const inputImgWrap = document.createElement("div");
  const inputImgBtnWrap = document.createElement("div");
  const inputImgBtnAdd = document.createElement("div");
  const inputImgBtnCancel = document.createElement("div");
  const inputImgBox = document.createElement("div");
  const inputImg = document.createElement("input");

  inputImgBtnWrap.classList.add("dp-f", "ai-c", "jc-c");
  inputImgBtnWrap.style.width = "200px";
  inputImgBtnWrap.style.marginTop = "5px";
  inputImgWrap.classList.add("dp-f", "ai-c", "jc-c", "fd-c");

  inputImgBtnAdd.classList.add("btn");
  inputImgBtnAdd.textContent = "Add";
  inputImgBtnAdd.style.width = "80px";
  inputImgBtnAdd.style.margin = "5px";
  inputImgBtnCancel.classList.add("btn-reverse");
  inputImgBtnCancel.textContent = "Cancel";
  inputImgBtnCancel.style.width = "80px";
  inputImgBtnCancel.style.margin = "5px";

  inputImgBtnWrap.append(inputImgBtnAdd, inputImgBtnCancel);

  inputImgBox.classList.add("input-img-box");
  inputImgBox.textContent = "Drag your image";
  inputImg.type = "file";
  inputImg.classList.add("input-img");

  // click input btn event
  inputImgBtnAdd.addEventListener("click", async () => {
    if (inputImg.files.length > 0) {
      const file = inputImg.files[0];
      console.log("이미지 파일:", file);
      await imageUpload(userName, albumName, file.name, file);

      viewAlbum(userName, albumName);
    } else {
      console.log("이미지 선택 안함.");
    }
  });

  inputImgBtnCancel.addEventListener("click", () => {
    inputImgBox.style.backgroundImage = "";
    inputImg.value = "";
  });

  // inputBox drag event
  inputImgBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    inputImgBox.classList.add("active");
  });
  inputImgBox.addEventListener("dragleave", () => {
    inputImgBox.classList.remove("active");
  });
  inputImgBox.addEventListener("drop", (e) => {
    e.preventDefault();
    inputImgBox.classList.remove("active");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      inputImg.files = files;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      inputImgBox.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(files[0]);
  });

  inputImgBox.append(inputImg);

  inputImgWrap.append(inputImgBox, inputImgBtnWrap);

  const deleteAlbumBtn = document.createElement("div");

  deleteAlbumBtn.classList.add("delete-user-album");
  deleteAlbumBtn.textContent = "Delete Album";

  deleteAlbumBtn.addEventListener("click", async () => {
    await deleteUserAlbum(albumName, userName);

    listAlbums(userName);

    console.log("1");
  });

  images.appendChild(inputImgWrap);
  images.appendChild(deleteAlbumBtn);
  // debugger;
};
