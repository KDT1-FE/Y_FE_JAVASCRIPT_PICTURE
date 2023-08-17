import { getProfileImg } from "../../s3/viewUserData";
import { generateProfilePage } from "./create-profile-page";
import { listAlbums } from "./view-album-page";

export const listUsers = () => {
  generateUser();
  const userJson = import.meta.env.VITE_USER_JSON;
  fetch(userJson)
    .then((res) => res.json())
    .then(async (data) => {
      // console.log(data);
      const editProfilePage = document.getElementById("edit-profile-page");
      const profilePage = document.getElementById("profile-page");
      const createUser = document.getElementById("create-user");
      const s3Viewer = document.getElementById("s3");

      if (editProfilePage.style.display !== "none") {
        editProfilePage.style.display = "none";
      }
      if (profilePage.style.display !== "none") {
        profilePage.style.display = "none";
      }
      if (createUser.style.display !== "none") {
        createUser.style.display = "none";
      }
      if (s3Viewer.style.display === "none") {
        s3Viewer.style.display = "block";
      }
      // debugger;

      const userElements = await Promise.all(
        data.map(async (v) => {
          const ProfileImg = await getProfileImg(v.id);
          return generateAlbumBtn(v.id, ProfileImg, data);
        })
      );

      userElements.forEach((e) => {
        users.appendChild(e);
      });
    })
    .catch((error) => {
      console.error("에러:", error);
    });
};

export const listSearchUsers = async (data) => {
  generateUser();
  // console.log(data);
  const editProfilePage = document.getElementById("edit-profile-page");
  const profilePage = document.getElementById("profile-page");
  const createUser = document.getElementById("create-user");
  const s3Viewer = document.getElementById("s3");

  if (editProfilePage.style.display !== "none") {
    editProfilePage.style.display = "none";
  }
  if (profilePage.style.display !== "none") {
    profilePage.style.display = "none";
  }
  if (createUser.style.display !== "none") {
    createUser.style.display = "none";
  }
  if (s3Viewer.style.display === "none") {
    s3Viewer.style.display = "block";
  }
  // debugger;

  const userElements = await Promise.all(
    data.map(async (v) => {
      const ProfileImg = await getProfileImg(v.id);
      return generateAlbumBtn(v.id, ProfileImg, data);
    })
  );

  userElements.forEach((e) => {
    users.appendChild(e);
  });
};

const generateAlbumBtn = (userName, profileImg, data) => {
  const userBox = document.createElement("div");

  const imgWrap = document.createElement("div");
  const infoWrap = document.createElement("div");

  const userBtnWrap = document.createElement("div");

  const img = document.createElement("img");
  const name = document.createElement("div");
  const nation = document.createElement("div");
  const pn = document.createElement("div");
  const email = document.createElement("div");

  const albumBtn = document.createElement("div");
  const profileBtn = document.createElement("div");

  if (data.length > 0) {
    const user = data.find((v) => v.id === userName);

    img.src = profileImg;
    name.textContent = user.name;
    nation.textContent = user.nation;
    pn.textContent = user.phon;
    email.textContent = user.email;

    albumBtn.textContent = "Go to Album";
    albumBtn.classList.add("btn");
    profileBtn.textContent = "Go to Profile";
    profileBtn.classList.add("btn-reverse");

    userBtnWrap.append(albumBtn, profileBtn);

    imgWrap.append(img);
    infoWrap.append(name, nation, pn, email, userBtnWrap);

    userBox.append(imgWrap, infoWrap);
  }

  albumBtn.addEventListener("click", () => {
    listAlbums(userName);
  });

  profileBtn.addEventListener("click", () => {
    const profilePage = document.getElementById("profile-page");
    const s3Viewer = document.getElementById("s3");

    s3Viewer.style.display = "none";
    profilePage.innerHTML = "";
    profilePage.style.display = "block";
    profilePage.append(generateProfilePage(userName));
  });

  return userBox;
};

export const generateUser = () => {
  const listTitle = document.getElementById("list-title");
  listTitle.textContent = "User lists";

  const getBackBtn = document.getElementsByClassName("buttonWrap");
  const backBtns = [...getBackBtn];

  backBtns.forEach((backBtn) => {
    backBtn.innerHTML = "";
    backBtn.display = "none";
    backBtn.classList.remove("btn");
  });

  const images = document.getElementById("images");
  const viewer = document.getElementById("viewer");

  images.innerHTML = "";

  if (images.style.display !== "none") {
    images.style.display = "none";
  }
  if (viewer.style.display !== "none") {
    viewer.style.display = "none";
  }

  const users = document.getElementById("users");

  users.innerHTML = "";

  if (users.style.display === "none") {
    users.style.display = "flex";
  }
};
