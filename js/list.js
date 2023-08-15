import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  or,
} from "firebase/firestore";
import { db } from "./firebase";
import { phoneType } from "./util";

// 고객 목록 DOM에 추가해주는 함수
const inquireListFunc = (querySnapshotArray) => {
  querySnapshotArray.forEach((doc) => {
    const boxTag = document.createElement("a");
    boxTag.href = `detail.html?id=${doc.id}`;
    boxTag.className = `list-box`;

    const checkTag = document.createElement("input");
    checkTag.type = "checkbox";
    checkTag.className = "delete-checkbox";
    checkTag.value = doc.id;

    const avatarBox = document.createElement("div");
    avatarBox.className = "avatar-box";
    const avatarImg = document.createElement("img");
    avatarImg.className = "avatar-img";
    avatarImg.src = doc.data().avatar;
    avatarBox.appendChild(avatarImg);

    const customerGrade = document.createElement("span");
    customerGrade.className = "customer-grade";
    customerGrade.innerText = doc.data().grade;

    const customerName = document.createElement("span");
    customerName.className = "customer-name";
    customerName.innerText = doc.data().name;

    const customerEmail = document.createElement("span");
    customerEmail.className = "customer-email";
    customerEmail.innerText = doc.data().email;

    const customerPhone = document.createElement("span");
    customerPhone.className = "customer-phone";
    customerPhone.innerText = phoneType(doc.data().phone);

    boxTag.appendChild(checkTag);
    boxTag.appendChild(avatarBox);
    boxTag.appendChild(customerGrade);
    boxTag.appendChild(customerName);
    boxTag.appendChild(customerEmail);
    boxTag.appendChild(customerPhone);

    const listContainer = document.querySelector(".list-container");
    listContainer.appendChild(boxTag);
  });
};

window.onload = async () => {
  // 페이지 로드시 전체 목록 뿌려주기
  const allQuerySnapshot = await getDocs(collection(db, "customers"));
  inquireListFunc(allQuerySnapshot);

  // 고객 삭제 기능
  let deleteList = [];
  // 체크한 고객 배열에 삽입
  const deleteChek = document.querySelectorAll(".delete-checkbox");
  for (const i of deleteChek) {
    i.addEventListener("click", (e) => {
      if (i.checked) {
        deleteList.push(i.value);
      } else {
        deleteList = deleteList.filter((e) => e !== i.value);
      }
    });
  }
  // 버튼 클릭하면 삭제 요청
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", async (e) => {
    if (deleteList.length > 0) {
      if (window.confirm("삭제하시겠습니까?")) {
        deleteList.forEach(async (id) => {
          await deleteDoc(doc(db, "customers", id)).then(() => {
            location.reload();
          });
        });
        alert("삭제되었습니다.");
      } else {
        alert("취소되었습니다.");
      }
    } else {
      alert("삭제할 고객을 선택하세요.");
    }
  });

  // 고객 목록 검색 기능
  const searchInput = document.querySelector(".search-input");

  searchInput.addEventListener("input", async () => {
    const searchQuerySnapshot = await getDocs(
      query(
        collection(db, "customers"),
        or(
          where("name", "==", searchInput.value),
          where("email", "==", searchInput.value),
          where("phone", "==", searchInput.value),
          where("grade", "==", searchInput.value)
        )
      )
    );
    // 목록에서 이전 결과 삭제
    document.querySelectorAll(".list-box").forEach((i) => {
      i.remove();
    });
    // 검색 결과 표시
    // 검색어가 없을 때는 전체 목록 표시
    if (searchInput.value) {
      inquireListFunc(searchQuerySnapshot);
    } else {
      inquireListFunc(allQuerySnapshot);
    }
  });
};
