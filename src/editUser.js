import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { uploadImageToStorage } from "./uploadImage";

const userListContainer = document.querySelector(".user__list");
let userId;
const addForm = document.querySelector(".form-add");
const editForm = document.querySelector(".form-edit");

userListContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".user__menu-edit");
  // 수정 버튼 클릭 시 폼 변경
  if (editBtn) {
    const userEl = editBtn.closest(".user__user");

    userId = userEl.dataset.id;
    const userName = userEl.querySelector(".user__name").textContent;
    const userEmail = userEl.querySelector(".user__email").textContent;
    const userPosition = userEl.querySelector(".user__position").textContent;
    const userProfileImage = userEl.querySelector(".user__image").src;

    document.getElementById("edit-image-preview").src = userProfileImage;
    document.getElementById("edit-name").value = userName;
    document.getElementById("edit-email").value = userEmail;
    document.getElementById("edit-position").value = userPosition;

    addForm.classList.add("hidden");
    editForm.classList.remove("hidden");
  }
});

async function handleEditSubmit(e) {
  e.preventDefault();

  const editName = document.getElementById("edit-name").value;
  const editEmail = document.getElementById("edit-email").value;
  const editPosition = document.getElementById("edit-position").value;
  const editImageFile = document.getElementById("edit-chooseFile").files[0];

  const editImageUrl = editImageFile
    ? await uploadImageToStorage(editImageFile)
    : null;

  const updatedData = {
    name: editName,
    email: editEmail,
    position: editPosition,
    ...(editImageUrl && { imageUrl: editImageUrl }),
  };

  console.log("updatedData", updatedData);

  const userRef = doc(db, "users", userId);
  try {
    updateDoc(userRef, updatedData);
    editForm.classList.add("hidden");
    console.log("success");
  } catch (err) {
    console.log("error", err);
  }
}

editForm.addEventListener("submit", handleEditSubmit);
