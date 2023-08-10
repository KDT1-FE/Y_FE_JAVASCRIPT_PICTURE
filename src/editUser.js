import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const userList = document.querySelector(".user__list");
let userId;

userList.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".user__menu-edit");

  // 수정 버튼 클릭 시 폼 변경
  if (editBtn) {
    const userEl = editBtn.closest(".user__user");

    userId = userEl.dataset.id;
    const userName = userEl.querySelector(".user__name").textContent;
    const userEmail = userEl.querySelector(".user__email").textContent;
    const userProfileImage = userEl.querySelector(".user__image").src;

    document.getElementById("edit-image-preview").src = userProfileImage;
    document.getElementById("edit-name").value = userName;
    document.getElementById("edit-email").value = userEmail;

    document.querySelector(".form-add").classList.add("hidden");
    document.querySelector(".form-edit").classList.remove("hidden");
  }
});

function handleEditSubmit(e) {
  e.preventDefault();

  const editName = document.getElementById("edit-name").value;
  const editEmail = document.getElementById("edit-email").value;

  const updatedData = {
    name: editName,
    email: editEmail,
  };

  console.log("updatedData", updatedData);

  const userRef = doc(db, "users", userId);
  try {
    updateDoc(userRef, updatedData);
    console.log(updatedData);
    console.log("success");
  } catch (err) {
    console.log("error", err);
  }
}

const editForm = document.querySelector(".form-edit");
editForm.addEventListener("submit", handleEditSubmit);
