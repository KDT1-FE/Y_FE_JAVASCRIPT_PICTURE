// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import * as storageModule from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa8XH8OjhbUUgIHcoSd4xWEUFkGfnuIdM",
  authDomain: "nhj-js-homework.firebaseapp.com",
  projectId: "nhj-js-homework",
  storageBucket: "nhj-js-homework.appspot.com",
  messagingSenderId: "741149984145",
  appId: "1:741149984145:web:7ac61b0622986fec214630",
  measurementId: "G-LWFHL30P81",
  databaseURL: "https://nhj-js-homework-default-rtdb.firebaseio.com",
  storageBucket: "gs://nhj-js-homework.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = storageModule.getStorage(app);
// const storageRef = storageModule.ref(storage);
export let userCount;
export let ptCount;

function writeUserData(
  userId,
  name,
  phone,
  start,
  end,
  image,
  session,
  leftSession,
  trainer
) {
  const db = getDatabase();
  try {
    set(ref(db, "users/" + userId), {
      userIdx: userId,
      username: name,
      phoneNumber: phone,
      startDate: start,
      endDate: end,
      imagePath: image,
      sessionNumber: session,
      leftSessionNumber: leftSession,
      trainerName: trainer,
    });
    console.log("user data sent to database");
  } catch (err) {
    console.log(err);
  }
}

function readUserData() {
  return new Promise((resolve) => {
    const dbRef = ref(getDatabase());
    // const customerNum = document.getElementById("customer_number");
    get(child(dbRef, "users/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (window.location.pathname === "/index.html") {
            displayUserData(snapshot.val());
          }
          userCount = snapshot.val().length;
          if (
            window.location.pathname.includes("/detail.html") ||
            window.location.pathname.includes("/update.html")
          ) {
            const url = new URL(window.location.href);
            const userNum = url.searchParams.get("number");
            resolve(snapshot.val()[userNum]);
          }
        } else {
          userCount = 1;
          console.log("user data is not exist.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function deleteUserData(userId) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), null);
  deletePtData(userId);

  console.log(`user ${userId} was deleted`);
}

function displayUserData(arr) {
  const userBox = document.getElementsByClassName(
    "section__customer--template"
  )[0];

  if (arr) {
    arr.forEach((element) => {
      console.log(arr);
      console.log(element);
      const userInfoFrame = document.createElement("ul");
      const userSelectBox = document.createElement("input");
      const userIndex = document.createElement("li");
      const userImage = document.createElement("img");
      const userName = document.createElement("li");
      const userphoneNumber = document.createElement("li");
      const userDate = document.createElement("li");
      const userPtCheck = document.createElement("li");
      const userPtSession = document.createElement("li");
      const userTrainer = document.createElement("li");
      if (element.sessionNumber === "") {
        userPtCheck.innerHTML = "X";
      } else {
        userPtCheck.innerHTML = "O";
      }
      userInfoFrame.className = "section__customer--added";
      userSelectBox.type = "checkbox";
      userSelectBox.className = "section__customer--checkbox";
      userImage.src = element.imagePath;
      userImage.style.width = "5vw";
      userIndex.innerHTML = element.userIdx;
      userIndex.addEventListener("click", function (e) {
        window.location.href = `detail.html?number=${element.userIdx}`;
      });
      userName.innerHTML = element.username;
      userphoneNumber.innerHTML = element.phoneNumber;
      userDate.innerHTML = `${element.startDate} ~ ${element.endDate}`;
      userPtSession.innerHTML =
        element.sessionNumber !== ""
          ? `${element.leftSessionNumber} / ${element.sessionNumber}`
          : "-";
      userTrainer.innerHTML =
        element.trainerName !== "" ? element.trainerName : "-";

      userInfoFrame.append(
        userSelectBox,
        userIndex,
        userImage,
        userName,
        userphoneNumber,
        userDate,
        userPtCheck,
        userPtSession,
        userTrainer
      );
      userBox.append(userInfoFrame);
    });
  }
}

function writePtData(
  userId,
  sessionId,
  date,
  subject,
  workout,
  weight,
  reps,
  sets,
  other
) {
  const db = getDatabase();
  try {
    console.log(sessionId, date);
    set(ref(db, `user/${userId}/pt/` + sessionId), {
      sessionIdx: sessionId,
      date: date,
      subject: subject,
      workout: workout,
      weight: weight,
      reps: reps,
      sets: sets,
      other: other,
    });
    console.log("pt session data sent to database");
  } catch (err) {
    console.log(err);
  }
}

function readPtData(userId) {
  return new Promise((resolve) => {
    const dbRef = ref(getDatabase());
    // const customerNum = document.getElementById("customer_number");
    get(child(dbRef, `user/${userId}/pt/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          ptCount = snapshot.val().length;
          resolve(snapshot.val());
        } else {
          ptCount = 1;
          resolve(ptCount);
          console.log("pt session data is not exist.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function deletePtData(userId) {
  const db = getDatabase();
  set(ref(db, `user/${userId}/pt/`), null);

  console.log(`user ${userId} session info was deleted`);
}

function uploadImageData(image, imageName) {
  return new Promise((resolve) => {
    const st = storageModule.getStorage();
    const storageRef = storageModule.ref(st, `image/${imageName}`);
    console.log(image, imageName);
    storageModule.uploadBytes(storageRef, image).then((snapshot) => {
      storageModule.getDownloadURL(snapshot.ref).then((url) => {
        console.log("url: ", url);
        image.msg = url;
        resolve(image.msg);
      });
    });
    console.log("image sent to storage");
  });
}

export {
  writeUserData,
  readUserData,
  deleteUserData,
  uploadImageData,
  writePtData,
  readPtData,
};
