import { listUsers } from "../view/view-user-page";
import { generateAddUserPage } from "../view/create-user-page";

export const viewUserPage = () => {
  const viewUserBtn = document.querySelector(".view-user");
  viewUserBtn.addEventListener("click", () => {
    listUsers();
  });
};

export const createUser = () => {
  const addUserBtn = document.querySelector(".header_nav .add-user");
  const createUserSection = document.getElementById("create-user");
  const s3Viewer = document.getElementById("s3");
  const editProfilePage = document.getElementById("edit-profile-page");
  const profilePage = document.getElementById("profile-page");

  addUserBtn.addEventListener("click", () => {
    const editProfilePage = document.getElementById("edit-profile-page");
    editProfilePage.innerHTML = "";
    createUserSection.innerHTML = "";
    createUserSection.append(generateAddUserPage());

    if (createUserSection.style.display === "none") {
      createUserSection.style.display = "block";
    }
    if (s3Viewer.style.display !== "none") {
      s3Viewer.style.display = "none";
    }
    if (editProfilePage.style.display !== "none") {
      editProfilePage.style.display = "none";
    }
    if (profilePage.style.display !== "none") {
      profilePage.style.display = "none";
    }
  });
};
