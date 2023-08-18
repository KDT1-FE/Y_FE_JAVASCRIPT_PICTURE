import {
  getProfileImg,
  profileUpload,
  profileDelete,
} from "../../s3/viewUserData";
import { addUserData } from "../../s3/handleUserData";
import { listUsers } from "./view-user-page";

export const generateEditProfilePage = (user) => {
  // console.log(user);
  // Create the main container
  const container = document.createElement("div");
  container.classList.add("container", "dp-f", "ai-c", "jc-c");

  // Create the left section
  const leftSection = document.createElement("div");
  leftSection.classList.add("create-user__left");

  // Create the image container
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("create-user__left--img");

  // Create the image input
  const imgInput = document.createElement("input");

  imgInput.addEventListener("change", (e) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      profileImg.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  imgInput.type = "file";
  imgInput.classList.add("profile-img__input");
  imgInput.style.display = "none";

  // Create the profile image
  const profileImg = document.createElement("img");
  profileImg.alt = "";
  profileImg.style.width = "100%";
  profileImg.id = "profile-img";
  profileImg.accept = "image/png, image/jpeg";

  // get profile img
  const profileImgUrl = async () => {
    try {
      const imgUrl = await getProfileImg(user.id);
      profileImg.src = imgUrl;
    } catch (err) {
      console.log(err);
    }
  };

  profileImgUrl();

  // //////////////////////////////////////////////////////////////////
  imgInput.addEventListener("change", () => {
    const selectedFile = imgInput.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      console.log(fileName);
    }
  });
  // //////////////////////////////////////////////////////////////////

  profileImg.addEventListener("click", (e) => {
    e.preventDefault();
    imgInput.click();
  });

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

  // Create input fields with labels
  const fields = [
    { label: "Name", type: "text", id: "user-name" },
    { label: "Email", type: "email", id: "user-email" },
    {
      label: "Phon Number",
      type: "text",
      id: "user-phon",
      placeholder: "010-0000-0000",
    },
    { label: "Nation", type: "text", id: "user-nation" },
  ];

  fields.forEach((field) => {
    const userDataKey = field.id.split("-")[1];
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add(field.id);

    const label = document.createElement("label");
    label.for = field.id;
    label.textContent = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;
    input.value = user[userDataKey];

    input.addEventListener("input", (e) => {
      user[userDataKey] = e.target.value;
    });

    if (field.placeholder) {
      input.placeholder = field.placeholder;
    }

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);

    userInfoSection.appendChild(fieldContainer);
  });

  // Create the button section
  const buttonSection = document.createElement("div");
  buttonSection.classList.add("create-user__right--button");

  const saveButton = document.createElement("div");
  saveButton.classList.add("btn", "save-profile-btn");
  saveButton.textContent = "SAVE";

  const cancelButton = document.createElement("div");
  cancelButton.classList.add("btn-reverse");
  cancelButton.textContent = "CANCEL";

  // Click save event
  saveButton.addEventListener("click", async () => {
    const currentUrl = await getProfileImg(user.id);
    const decodedCurrentUrl = decodeURIComponent(currentUrl);
    const currentArr = decodedCurrentUrl.split("/");
    const n = currentArr.length;
    const currentImg = currentArr[n - 1];

    // Change profile Img
    const selectedFile = imgInput.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      console.log(fileName);

      console.log(currentImg);
      await profileDelete(user.id, currentImg);
      await profileUpload(user.id, selectedFile, fileName);
    } else {
      console.log("변경 X");
    }

    // Change user Data
    const userJson = import.meta.env.VITE_USER_JSON;
    if (
      user.id === null ||
      user.name === null ||
      user.email === null ||
      user.pn === null ||
      user.nation === null
    ) {
      alert("모든 항목을 입력해 주세요.");
    } else {
      await fetch(userJson)
        .then((res) => res.json())
        .then(async (data) => {
          const copy = [...data];
          let foundElIndex = copy.findIndex((v) => v.id === user.id);
          copy[foundElIndex] = user;
          await addUserData(JSON.stringify(copy));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      listUsers();
    }
  });

  // Click cancel evnet
  cancelButton.addEventListener("click", () => {
    listUsers();
  });

  buttonSection.appendChild(saveButton);
  buttonSection.appendChild(cancelButton);

  rightSection.appendChild(userInfoSection);
  rightSection.appendChild(buttonSection);

  // Append sections to the main container
  container.appendChild(leftSection);
  container.appendChild(rightSection);

  return container;
};
