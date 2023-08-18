import {
  writeUserData,
  readUserData,
  writePtData,
  readPtData,
} from "./firebase.js";

const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const todayString = year + "-" + month + "-" + day;
let ptFrame = document.createElement("ul");
let ptSessionId = document.createElement("input");
let ptDate = document.createElement("input");
let ptSubject = document.createElement("textarea");
let ptWorkout = document.createElement("textarea");
let ptWeight = document.createElement("textarea");
let ptReps = document.createElement("textarea");
let ptSets = document.createElement("textarea");
let ptOther = document.createElement("textarea");

const imageFrame = document.createElement("img");
const imageDeleteButton = document.createElement("button");
const updateButton = document.getElementById("update_button");

const userIdx = document.createElement("div");
const userPtIdx = document.createElement("div");
const userName = document.getElementById("user_name");
const userPhone = document.getElementById("user_phone");
const startDate = document.getElementById("start_of_days");
const endDate = document.getElementById("end_of_days");
const isPt = document.getElementById("pt_check");
const leftSession = document.getElementById("pt_session");
const trainer = document.getElementById("pt_trainer");
const userImage = document.getElementsByClassName("section__enroll--image")[0];
const profileImage = document.getElementById("image_upload").files[0];
console.log(profileImage);
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

  imageFrame.style = `width: 30vw; height: 30vh; background-size: cover`;
  imageFrame.src = res.imagePath;

  imageDeleteButton.classList = "section__enroll--image_delete";
  imageDeleteButton.style = "display: block";
  imageDeleteButton.innerHTML = "삭제";
  userImage.append(imageFrame, imageDeleteButton);

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

      userPtIdx.value = res[userIdx.value].sessionIdx;
      ptSessionId.value = i;
      ptSessionId.disabled = true;
      ptDate.value = todayString;
      ptDate.disabled = true;
      ptWorkout.value = res[userIdx.value].workout;
      ptWorkout.rows = "10";
      ptWeight.value = res[userIdx.value].weight;
      ptWeight.rows = "10";
      ptReps.value = res[userIdx.value].reps;
      ptReps.rows = "10";
      ptSets.value = res[userIdx.value].sets;
      ptSets.rows = "10";
      ptOther.value = res[userIdx.value].other;
      ptOther.rows = "10";

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

updateButton.addEventListener("click", function (e) {
  let changedImage = document.getElementsByClassName("imageFrame")[0];
  let msg = "";

  if (changedImage) {
    msg = changedImage.src;
  } else {
    msg = imageFrame.src;
  }
  console.log(msg);

  if (isPt.checked) {
    writeUserData(
      userIdx.value,
      userName.value,
      userPhone.value,
      startDate.value,
      endDate.value,
      msg,
      leftSession.value,
      leftSession.value,
      trainer.value
    );
  } else {
    writeUserData(
      userIdx.value,
      userName.value,
      userPhone.value,
      startDate.value,
      endDate.value,
      msg,
      "",
      "",
      ""
    );
  }

  window.location.href = `detail.html?number=${userIdx.value}`;
});

imageDeleteButton.addEventListener("click", function (e) {
  imageFrame.remove();
  const deleteTarget = document.getElementsByClassName("imageFrame")[0];
  if (deleteTarget) {
    deleteTarget.remove();
  }
});

const ptAddButton = document.getElementById("pt_add");
ptAddButton.addEventListener("click", function (e) {
  let ptFrame = document.createElement("ul");
  let ptSessionId = document.createElement("input");
  let ptDate = document.createElement("input");
  let ptSubject = document.createElement("textarea");
  let ptWorkout = document.createElement("textarea");
  let ptWeight = document.createElement("textarea");
  let ptReps = document.createElement("textarea");
  let ptSets = document.createElement("textarea");
  let ptOther = document.createElement("textarea");
  ptSessionId.value = ++userPtIdx.value;
  ptSessionId.disabled = true;
  ptDate.value = todayString;
  ptDate.disabled = true;
  ptWorkout.rows = "10";
  ptWeight.rows = "10";
  ptReps.rows = "10";
  ptSets.rows = "10";
  ptOther.rows = "10";

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
});

const ptSubmitButton = document.getElementById("pt_submit");
ptSubmitButton.addEventListener("click", function () {
  const container = document.getElementsByClassName(
    "section__detail--pt_template"
  )[0];
  console.log(container);
  console.log(container.lastChild);
  console.log(container.lastChild.childNodes);
  let ptSessionId = document.createElement("input");
  let ptDate = document.createElement("input");
  let ptSubject = document.createElement("textarea");
  let ptWorkout = document.createElement("textarea");
  let ptWeight = document.createElement("textarea");
  let ptReps = document.createElement("textarea");
  let ptSets = document.createElement("textarea");
  let ptOther = document.createElement("textarea");
  const lastSession = container.lastChild.childNodes;

  ptSessionId.value = lastSession[0].value;
  ptDate.value = lastSession[1].value;
  ptSubject.value = lastSession[2].value;
  ptWorkout.value = lastSession[3].value;
  ptWeight.value = lastSession[4].value;
  ptReps.value = lastSession[5].value;
  ptSets.value = lastSession[6].value;
  ptOther.value = lastSession[7].value;

  writePtData(
    userIdx.value,
    ++ptSessionId.value,
    ptDate.value,
    ptSubject.value,
    ptWorkout.value,
    ptWeight.value,
    ptReps.value,
    ptSets.value,
    ptOther.value
  );
  window.location.href = `detail.html?number=${userIdx.value}`;
});
