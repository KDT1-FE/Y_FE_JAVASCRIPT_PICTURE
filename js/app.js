import data from "./data.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
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

// 이미지 다운로드 URL 가져와서 Firestore 업데이트하는 함수
async function updateImgInFirestore(docId, imagePath) {
  try {
    const imageRef = ref(storage, imagePath);
    const downloadURL = await getDownloadURL(imageRef);

    const userDocRef = doc(db, "database", docId);
    await updateDoc(userDocRef, {
      profileImg: downloadURL,
    });

    console.log("프로필 이미지 업데이트 완료");
  } catch (error) {
    console.error("프로필 이미지 업데이트 에러:", error);
  }
}

// const documentId = "FdC1MIb4wT2K3pBpiaIl";
// const imagePath = "images/profile-1.jpg";
// updateImgInFirestore(documentId, imagePath);

// async function addIdsToDocuments() {
//   const collectionRef = collection(db, "database");

//   try {
//     const querySnapshot = await getDocs(collectionRef);
//     querySnapshot.forEach(async (docSnapshot) => {
//       const docData = docSnapshot.data();
//       const docId = docSnapshot.id;

//       // 기존 데이터에 ID 추가
//       const updatedData = { ...docData, id: docId };

//       // 해당 문서 업데이트
//       const userDocRef = doc(db, "database", docId);
//       await updateDoc(userDocRef, updatedData);
//     });

//     console.log("IDs added to all documents.");
//   } catch (error) {
//     console.error("Error adding IDs to documents:", error);
//   }
// }

// // 함수 호출하여 기존 문서에 ID 추가
// addIdsToDocuments();

// 클릭한 데이터의 id를 기반으로 Firestore에서 문서 ID를 얻는 함수
async function getDocumentIdById(id) {
  const querySnapshot = await getDocs(query(collection(db, "database"), where("id", "==", id)));
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id; // 첫 번째 문서의 ID를 반환합니다.
  }
  return null; // 해당 id와 일치하는 문서가 없을 경우 null을 반환합니다.
}

// 상세 버튼 클릭 시 상세 페이지로 이동하는 함수
function redirectToProfilePage(id) {
  getDocumentIdById(id)
    .then((documentId) => {
      if (documentId) {
        window.location.href = `profile.html?documentId=${documentId}`;
      } else {
        console.log("해당 id와 일치하는 문서가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("문서 ID 얻기 에러:", error);
    });
}

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
      // console.log(data);
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
    `<img src="${data.profileImg}" width="150" alt="${data.name} Profile Image">`,
    data.name,
    data.email,
    data.phone,
    `<button class="btn btn-primary btn-profile" data-id="${data.id}">상세</button><button class="btn" id="btn-delete">삭제</button>`,
  ];

  cellContents.forEach((content, columnIndex) => {
    const cell = createTableCell(content);

    if (columnIndex === cellContents.length - 1) {
      const profileButton = cell.querySelector(".btn-profile");
      profileButton.addEventListener("click", () => {
        const documentId = profileButton.getAttribute("data-id");
        // 해당 데이터의 ID를 쿼리 파라미터로 전달하여 profile.html 페이지로 이동
        // window.location.href = `profile.html?documentId=${documentId}`;
      });
    }

    row.appendChild(cell);
  });

  return row;
}

// 테이블 렌더링 함수 호출
renderTable();

// 상세 버튼 클릭 시 프로필 페이지로 이동
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-profile")) {
    const id = event.target.getAttribute("data-id");
    redirectToProfilePage(id);
  }
});
