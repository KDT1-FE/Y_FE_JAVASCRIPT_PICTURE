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
        customerNum.value = snapshot.val().length;
      } else {
        console.log("nothing");
      }
    })
    .catch((error) => {
      console.error(error);
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
