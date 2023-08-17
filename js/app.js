import data from "./data.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { addDoc, deleteDoc, collection, getFirestore, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
const storage = getStorage(app);
const db = getFirestore(app);

async function renderTable() {
  const tableBody = document.getElementById("table");
  let index = 1;

  try {
    // Firestore에서 데이터 가져오기
    const querySnapshot = await getDocs(collection(db, "database"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = createTableRow(index++, data);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("데이터를 가져오는 중 에러:", error);
  }
}

// 셀을 생성하는 함수
function createTableCell(content) {
  const cell = document.createElement("td");
  cell.innerHTML = content;
  return cell;
}

function createTableRow(index, data) {
  const row = document.createElement("tr");

  const cellContents = [
    index,
    `<img src="${data.profileImg}" class="profile-img" alt="${data.name} Profile Image">`,
    data.name,
    data.email,
    data.phone,
    `<button class="btn btn-primary btn-profile" data-id="${data.id}">상세</button><button class="btn btn-danger" id="btn-delete" data-id="${data.id}">삭제</button>`,
  ];

  cellContents.forEach((content, columnIndex) => {
    const cell = createTableCell(content);

    row.appendChild(cell);
  });

  return row;
}

// 테이블 렌더링 함수 호출
renderTable();

function redirectToProfilePage(docId) {
  window.location.href = `profile.html?documentId=${docId}`;
}

const registerButton = document.getElementById("add-profile-btn");
registerButton.addEventListener("click", async () => {
  try {
    const newDocRef = await addDoc(collection(db, "database"), {}); // 빈 문서 생성
    const newDocumentId = newDocRef.id;

    // 데이터를 객체 형태로 구성하여 ID 필드를 추가
    const data = {
      id: newDocumentId,
      name: "",
      phone: "",
      email: "",
      profileImg: "",
    };

    // id 필드가 추가된 데이터를 업데이트하여 Firestore에 저장합니다.
    updateDoc(newDocRef, data)
      .then(() => {
        console.log("ID field updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating ID field: ", error);
      });

    // 새 문서 ID를 가지고 profile 페이지로 리디렉션
    redirectToProfilePage(newDocumentId);
  } catch (error) {
    console.error("새로운 문서 추가 에러:", error);
  }
});

// 상세 버튼 클릭 시 프로필 페이지로 이동
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-profile")) {
    const docId = event.target.getAttribute("data-id");
    redirectToProfilePage(docId);
  }
});

// 삭제 버튼 클릭 시 Firestore 문서 삭제 및 테이블 업데이트
document.addEventListener("click", async (event) => {
  if (event.target.id === "btn-delete") {
    const docId = event.target.getAttribute("data-id");
    const confirmDelete = confirm("정말로 이 데이터를 삭제하시겠습니까?");
    console.log(docId);
    event.preventDefault();
    if (confirmDelete) {
      try {
        const docRef = doc(db, "database", docId);

        await deleteDoc(docRef);
        console.log("데이터 삭제 완료");
        location.reload();
      } catch (error) {
        console.error("데이터 삭제 에러:", error);
      }
    }
  }
});

// 상세 버튼 클릭 시 프로필 페이지로 이동
// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains("btn-profile")) {
//     const id = event.target.getAttribute("data-id");
//     redirectToProfilePage(id);
//   }
// });
// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains("btn-profile")) {
//     const docId = event.target.getAttribute("data-id");
//     redirectToProfilePage(docId);
//   }
// });
