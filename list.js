import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// 리스트 뿌려주기
window.onload = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  querySnapshot.forEach((doc) => {
    const BoxTag = document.createElement("a");
    BoxTag.href = `detail.html?${doc.id}`;
    BoxTag.className = `list-box`;

    const checkTag = document.createElement("input");
    checkTag.type = "checkbox";

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
};
