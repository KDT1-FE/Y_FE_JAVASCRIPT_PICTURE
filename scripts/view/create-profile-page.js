import { generateEditProfilePage } from "./create-edit-profile-page";
import { deleteUserData, addUserData } from "../../s3/handleUserData";
import { getProfileImg } from "../../s3/viewUserData";
import { listUsers } from "./view-user-page";

export const generateProfilePage = (userName) => {
  const userJson = import.meta.env.VITE_USER_JSON;
  const container = document.createElement("div");
  fetch(userJson)
    .then((res) => res.json())
    .then(async (data) => {
      // console.log("data:", data);
      const user = data.find((v) => v.id === userName);
      // console.log(user);

      // get profile img
      const profileImgUrl = await getProfileImg(user.id);

      // Create the main container
      container.classList.add("container", "dp-f", "ai-c", "jc-c");

      // Create the left section
      const leftSection = document.createElement("div");
      leftSection.classList.add("create-user__left");

      // Create the image container
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("create-user__left--img");

      // Create the image input
      const imgInput = document.createElement("input");
      imgInput.type = "file";
      imgInput.classList.add("profile-img__input");
      imgInput.style.display = "none";

      // Create the profile image
      const profileImg = document.createElement("img");
      profileImg.src = profileImgUrl;
      profileImg.alt = "";
      profileImg.style.width = "100%";
      profileImg.id = "profile-img";
      profileImg.accept = "image/png, image/jpeg";

      imgContainer.appendChild(imgInput);
      imgContainer.appendChild(profileImg);

      // Create the social icons
      const socialIcons = document.createElement("div");
      socialIcons.classList.add("create-user__left--social");

      const facebookImg = document.createElement("img");
      facebookImg.src = "./images/facebook.png";
      facebookImg.alt = "";

      const githubImg = document.createElement("img");
      githubImg.src = "./images/github.png";
      githubImg.alt = "";

      const instagramImg = document.createElement("img");
      instagramImg.src = "./images/instagram.png";
      instagramImg.alt = "";

      socialIcons.appendChild(facebookImg);
      socialIcons.appendChild(githubImg);
      socialIcons.appendChild(instagramImg);

      leftSection.appendChild(imgContainer);
      leftSection.appendChild(socialIcons);

      // Create the right section
      const rightSection = document.createElement("div");
      rightSection.classList.add("create-user__right");

      // Create the user info section
      const userInfoSection = document.createElement("div");
      userInfoSection.classList.add("create-user__right--info");

      // Create user info elements
      const userInfoElements = [
        { label: "Name :", class: "name", innerClass: "profile-page__name" },
        { label: "Email :", class: "email", innerClass: "profile-page__email" },
        {
          label: "Phon Number :",
          class: "phon",
          innerClass: "profile-page__phon",
        },
        {
          label: "Nation :",
          class: "nation",
          innerClass: "profile-page__nation",
        },
      ];

      userInfoElements.forEach((element) => {
        const fieldContainer = document.createElement("div");
        fieldContainer.classList.add(element.class);

        const label = document.createElement("div");
        label.textContent = element.label;

        const value = document.createElement("div");
        value.classList.add(element.innerClass);
        value.innerText = user[element.class];

        fieldContainer.appendChild(label);
        fieldContainer.appendChild(value);

        userInfoSection.appendChild(fieldContainer);
      });

      // Create the button section
      const buttonSection = document.createElement("div");
      buttonSection.classList.add("create-user__right--button");

      const editButton = document.createElement("div");
      editButton.classList.add("btn-reverse", "edit-profile-btn");
      editButton.innerHTML = `
  <span>
    <i class="fa-solid fa-pencil" style="margin-right: 7px"></i>
  </span>
  <span>EDIT PROFILE</span>
`;

      const deleteButton = document.createElement("div");
      deleteButton.classList.add("btn", "delete-profile-btn");
      deleteButton.innerHTML = `
  <span>
    <i class="fa-solid fa-trash-can" style="margin-right: 7px"></i>
  </span>
  <span>DELETE USER</span>
`;
      // Click edit event
      editButton.addEventListener("click", () => {
        const createUser = document.getElementById("create-user");
        createUser.innerHTML = "";
        const profilePage = document.getElementById("profile-page");
        const profileEditPage = document.getElementById("edit-profile-page");
        profileEditPage.style.display = "block";
        profileEditPage.innerHTML = "";
        profilePage.innerHTML = "";
        profileEditPage.append(generateEditProfilePage(user));
      });

      // Click delete event
      deleteButton.addEventListener("click", async () => {
        const userJson = import.meta.env.VITE_USER_JSON;
        await fetch(userJson)
          .then((res) => res.json())
          .then(async (data) => {
            const filtered = data.filter((v) => v.id !== user.id);
            await addUserData(JSON.stringify(filtered));
            await deleteUserData(user.id);
            console.log(1);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        listUsers();
      });

      buttonSection.appendChild(editButton);
      buttonSection.appendChild(deleteButton);

      rightSection.appendChild(userInfoSection);
      rightSection.appendChild(buttonSection);

      // Append sections to the main container
      container.appendChild(leftSection);
      container.appendChild(rightSection);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return container;
};
