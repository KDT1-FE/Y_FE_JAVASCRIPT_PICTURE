import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

// 리스트 뿌려주기
window.onload = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  querySnapshot.forEach((doc) => {
    const BoxTag = document.createElement("a");
    BoxTag.href = `detail.html?id=${doc.id}`;
    BoxTag.className = `list-box`;

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
    customerPhone.innerText = doc.data().phone;

    BoxTag.appendChild(checkTag);
    BoxTag.appendChild(avatarBox);
    BoxTag.appendChild(customerGrade);
    BoxTag.appendChild(customerName);
    BoxTag.appendChild(customerEmail);
    BoxTag.appendChild(customerPhone);

    const listContainer = document.querySelector(".list-container");
    listContainer.appendChild(BoxTag);
  });

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
      deleteList.forEach(async (id) => {
        await deleteDoc(doc(db, "customers", id)).then(() => {
          location.reload();
        });
      });
    } else {
      alert("삭제할 고객을 선택하세요.");
    }
  });
};
