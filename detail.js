import { readUserData } from "./firebase.js";

// window.onload = function () {
readUserData().then((res) => {
  console.log(res);
  const userName = document.getElementById("user_name");
  const userPhone = document.getElementById("user_phone");
  const startDate = document.getElementById("start_of_days");
  const endDate = document.getElementById("end_of_days");
  const isPt = document.getElementById("pt_check");
  const leftSession = document.getElementById("pt_session");
  const trainer = document.getElementById("pt_trainer");
  const imageFrame = document.getElementsByClassName(
    "section__enroll--image"
  )[0];

  userName.value = res.username;
  userPhone.value = res.phoneNumber;
  startDate.value = res.startDate;
  endDate.value = res.endDate;
  if (res.leftSessionNumber || res.trainerName) {
    isPt.checked = true;
  } else isPt.checked = false;
  leftSession.value = res.leftSessionNumber;
  trainer.value = res.trainerName;

  const userImage = document.createElement("img");
  userImage.style = `width: 30vw; height: 30vh; background-size: cover`;
  userImage.src = res.imagePath;
  imageFrame.appendChild(userImage);
});
// };
