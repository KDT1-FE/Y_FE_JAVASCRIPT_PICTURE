import {
  btn_openEnrollForm,
  photoInput,
  enrollForm,
  btn_addProfile,
  btn_closeEnrollForm,
} from "/constant.js";

btn_openEnrollForm.addEventListener("click", openForm); // 프로필 등록 폼 열기
btn_closeEnrollForm.addEventListener("click", closeForm); // 프로필 등록 폼 닫기
photoInput.addEventListener("change", previewImg); // 이미지 프리뷰

function previewImg() {
  const imageSrc = URL.createObjectURL(photoInput.files[0]);
  document.getElementById("preview").src = imageSrc;
}

function openForm(e) {
  e.preventDefault();
  enrollForm.style.display = "flex";
}

function closeForm(e) {
  e.preventDefault();
  enrollForm.style.display = "none";
}
