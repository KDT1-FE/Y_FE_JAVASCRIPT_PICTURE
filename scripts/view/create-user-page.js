import { getProfileImg, profileUpload } from "../../s3/viewUserData";
import { addUserData, addUser } from "../../s3/handleUserData";
import { listUsers } from "./view-user-page";
import { v4 as uuid } from "uuid";

export const generateAddUserPage = () => {
  // Create main container
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
  profileImg.src = "./images/user.png";
  profileImg.alt = "";
  profileImg.style.width = "100%";
  profileImg.id = "profile-img";
  profileImg.accept = "image/png, image/jpeg";

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

  // Create the user information section
  const userInfoSection = document.createElement("div");
  userInfoSection.classList.add("create-user__right--info");

  // Create input fields
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

  const userData = {
    id: uuid(),
    name: null,
    email: null,
    phon: null,
    nation: null,
    picture: "./images/user.png",
  };

  fields.forEach((field) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add(field.id);

    const label = document.createElement("label");
    label.for = field.id;
    label.textContent = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.id = field.id;

    if (field.placeholder) {
      input.placeholder = field.placeholder;
    }

    // Input data event
    const userDataKey = field.id.split("-")[1];
    input.addEventListener("input", (e) => {
      userData[userDataKey] = e.target.value;
    });

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);

    userInfoSection.appendChild(fieldContainer);
  });

  // Create the button section
  const buttonSection = document.createElement("div");
  buttonSection.classList.add("create-user__right--button");

  const saveButton = document.createElement("div");
  saveButton.classList.add("btn");
  saveButton.textContent = "SAVE";

  const cancelButton = document.createElement("div");
  cancelButton.classList.add("btn-reverse");
  cancelButton.textContent = "CANCEL";

  // Click cancel event
  cancelButton.addEventListener("click", () => {
    const createUserSection = document.getElementById("create-user");
    const s3Viewer = document.getElementById("s3");
    if (createUserSection.style.display !== "none") {
      createUserSection.style.display = "none";
    }
    if (s3Viewer.style.display === "none") {
      s3Viewer.style.display = "block";
    }
    listUsers();
  });

  // Click save event
  saveButton.addEventListener("click", async () => {
    if (
      userData.id === null ||
      userData.name === null ||
      userData.email === null ||
      userData.pn === null ||
      userData.nation === null
    ) {
      alert("모든 항목을 입력해 주세요.");
    } else {
      const currentUrl = await getProfileImg(userData.id);
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
        await profileUpload(userData.id, selectedFile, fileName);
      } else {
        console.log("변경 X");
      }

      // create user
      await addUser(userData.id);

      // update user data
      const userJson = import.meta.env.VITE_USER_JSON;
      await fetch(userJson)
        .then((res) => res.json())
        .then(async (data) => {
          console.log("data:", data);
          const copy = [...data];
          copy.unshift(userData);

          await addUserData(JSON.stringify(copy));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(userData);
      listUsers();
    }
  });

  buttonSection.appendChild(saveButton);
  buttonSection.appendChild(cancelButton);

  rightSection.appendChild(userInfoSection);
  rightSection.appendChild(buttonSection);

  // Append sections to the main container
  container.appendChild(leftSection);
  container.appendChild(rightSection);

  // Return the created container
  return container;
};
