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

function writeUserData(
  userId,
  name,
  phone,
  start,
  end,
  image,
  session,
  trainer
) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    userId: userId,
    username: name,
    phoneNumber: phone,
    startDate: start,
    endDate: end,
    imagePath: image,
    sessionNumber: session,
    trainerName: trainer,
  });
  console.log("user data sent to database");
}

function readUserData() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, "users/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const customerNum = document.getElementById("customer_number");
        if (customerNum) {
          customerNum.value = snapshot.val().length;
        }
        if (window.location.pathname === "/index.html") {
          displayUserData(snapshot.val());
        }
      } else {
        console.log("nothing");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayUserData(arr) {
  console.log(window.location.pathname);
  const userBox = document.getElementsByClassName(
    "section__customer--template"
  )[0];
  arr.forEach((element) => {
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
    userSelectBox.type = "checkbox";
    userIndex.innerHTML = 0;
    userImage.src = element.imagePath;
    userImage.style.width = "5vw";
    userName.innerHTML = element.username;
    userphoneNumber.innerHTML = element.phoneNumber;
    userDate.innerHTML = `${element.startDate} ~ ${element.endDate}`;
    userPtSession.innerHTML =
      element.sessionNumber !== "" ? element.sessionNumber : "-";
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

function uploadImageData(image, imageName) {
  const st = storageModule.getStorage();
  const storageRef = storageModule.ref(st, `image/${imageName}`);
  storageModule.uploadBytes(storageRef, image).then((snapshot) => {
    storageModule.getDownloadURL(snapshot.ref).then((url) => {
      console.log("url: ", url);
      image.msg = url;
    });
  });
  console.log("image sent to storage");
}

export { writeUserData, readUserData, uploadImageData };
