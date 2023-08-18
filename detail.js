import { readUserData, readPtData } from "./firebase.js";

const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const todayString = year + "-" + month + "-" + day;
const userIdx = document.createElement("div");
const userName = document.getElementById("user_name");
const userPhone = document.getElementById("user_phone");
const startDate = document.getElementById("start_of_days");
const endDate = document.getElementById("end_of_days");
const isPt = document.getElementById("pt_check");
const leftSession = document.getElementById("pt_session");
const trainer = document.getElementById("pt_trainer");
const imageFrame = document.getElementsByClassName("section__enroll--image")[0];
readUserData().then((res) => {
  console.log(res);

  userIdx.value = res.userIdx;
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

  readPtData(userIdx.value).then((res) => {
    for (let i = 1; i < res.length; i++) {
      let ptFrame = document.createElement("ul");
      let ptSessionId = document.createElement("input");
      let ptDate = document.createElement("input");
      let ptSubject = document.createElement("textarea");
      let ptWorkout = document.createElement("textarea");
      let ptWeight = document.createElement("textarea");
      let ptReps = document.createElement("textarea");
      let ptSets = document.createElement("textarea");
      let ptOther = document.createElement("textarea");

      // userPtIdx.value = res[userIdx.value].sessionIdx;
      ptSessionId.value = i;
      ptSessionId.disabled = true;
      ptDate.value = todayString;
      ptDate.disabled = true;
      ptSubject.value = res[i].subject;
      ptSubject.disabled = true;
      ptWorkout.value = res[i].workout;
      ptWorkout.rows = "10";
      ptWorkout.disabled = true;
      ptWeight.value = res[i].weight;
      ptWeight.rows = "10";
      ptWeight.disabled = true;
      ptReps.value = res[i].reps;
      ptReps.rows = "10";
      ptReps.disabled = true;
      ptSets.value = res[i].sets;
      ptSets.rows = "10";
      ptSets.disabled = true;
      ptOther.value = res[i].other;
      ptOther.rows = "10";
      ptOther.disabled = true;

      ptFrame.append(
        ptSessionId,
        ptDate,
        ptSubject,
        ptWorkout,
        ptWeight,
        ptReps,
        ptSets,
        ptOther
      );
      document
        .getElementsByClassName("section__detail--pt_template")[0]
        .appendChild(ptFrame);
    }
  });
});

const updateButton = document.getElementById("go_update");
updateButton.addEventListener("click", function (e) {
  window.location.href = `update.html?number=${userIdx.value}`;
});
// };
