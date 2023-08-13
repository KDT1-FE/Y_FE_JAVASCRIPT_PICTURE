import data from "./data.js";
import { getStorage, ref } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_hGpmbxOceSWC-TYDqjGyQs3mGCbuDI0",
  authDomain: "project-js-160bd.firebaseapp.com",
  projectId: "project-js-160bd",
  storageBucket: "project-js-160bd.appspot.com",
  messagingSenderId: "134984714331",
  appId: "1:134984714331:web:12311afda7f0913b5f577e",
  measurementId: "G-7T5FSMF8Y8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const wrap = async () => {
  try {
    const docRef = await addDoc(collection(db, "database"), {
      /* users라는 객체에 아래 데이터가 담기게 된다 */
      date: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
wrap();
// const infos = ["pictureImg", "name", "email", "phoneNumber"];
const ROWS = 5;
const COLS = data.length;

// class TableData {}

// initTable();

// function initTable() {
//   for (let i = 0; i < ROWS; i++) {
//     let tableRow = [];

//     for (let j = 0; j < COLS; j++) {
//       let td = "";
//       let isHeader = false;

//       if (i === 0) {
//         td = infos[j];
//         isHeader = true;
//       }

//       if (!td) {
//         td = "";
//       }
//       const cell = new TableData();
//       tableRow.push(cell);
//     }
//     tableRow.push(tableRow);
//   }
//   drawTable();
// }

// function createTableData() {
//   const tdEl = document.createElement("td");
// }

//Random User Generator API

function makeRowDom(data) {
  let tr = "";
  tr += "<tr>";
  tr += "<td>" + data.index + "</td>";
  tr += "<td>" + data.pictureImg + "</td>";
  tr += "<td>" + data.name + "</td>";
  tr += "<td>" + data.email + "</td>";
  tr += "<td>" + data.phoneNumber + "</td>";
  tr += "</tr>";
  return tr;
}

function renderTable(data) {
  const dataLength = data.length;
  let rowList = "";
  for (let i = 0; i < dataLength; i++) {
    // if (i == 0) {}
    rowList += makeRowDom(data[i]);
  }
  document.querySelector("#table tbody").innerHTML = rowList;
}

window.onload = function () {
  renderTable(data);
};

// getUsers().then(showDatas);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Create a child reference
const imagesRef = ref(storage, "images");
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const profileRef = ref(storage, "images/space.jpg");
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"
