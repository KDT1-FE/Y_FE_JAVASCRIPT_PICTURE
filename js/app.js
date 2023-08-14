import data from "./data.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore, getDocs, updateDoc, doc } from "firebase/firestore";
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

const documentId = "FdC1MIb4wT2K3pBpiaIl";
const imagePath = "images/profile-1.jpg";
// updateImgInFirestore(documentId, imagePath);

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
    `<img src="${data.profileImg}" width="150" alt="${data.name} Profile Image">`,
    data.name,
    data.email,
    data.phone,
    `<button class="btn btn-primary" id="btn-edit">수정</button><button class="btn" id="btn-delete">삭제</button>`,
  ];

  cellContents.forEach((content, columnIndex) => {
    const cell = createTableCell(content);

    //수정버튼
    if (columnIndex === cellContents.length - 1) {
      const editButton = cell.querySelector("#btn-edit");
      editButton.addEventListener("click", () => {
        const profileData = {
          profileImg: data.profileImg,
          name: data.name,
          email: data.email,
          phone: data.phone,
        };
        // 데이터를 localStorage에 저장
        localStorage.setItem("profileData", JSON.stringify(profileData));

        // 수정 페이지로 이동
        window.location.href = "profile.html";
      });
    }

    row.appendChild(cell);
  });

  return row;
}

// 테이블 렌더링 함수 호출
renderTable();

// 수정버튼
// window.onload = function () {
//   const editButtons = document.querySelectorAll("#btn-edit");
//   console.log(editButtons);
//   editButtons.forEach((button, index) => {
//     button.addEventListener("click", () => {
//       console.log("clicked!");
//       const row = button.parentElement.parentElement;
//       const cells = row.querySelectorAll("td");
//       const profileImg = cells[1].querySelector("img").getAttribute("src");
//       const name = cells[2].textContent;
//       const email = cells[3].textContent;
//       const phone = cells[4].textContent;

//       // 데이터를 수정 페이지로 넘기기
//       window.location.href = `profile.html?profileImg=${profileImg}&name=${name}&email=${email}&phone=${phone}`;
//     });
//   });
// };
