const enrollBtn = document.getElementById("enroll-profile-btn");
const form = document.getElementsByClassName("add-profile")[0];
const image = document.getElementById("photo-input");
const submit = document.getElementsByClassName("add-profile__submit")[0];
const cancel = document.getElementsByClassName("add-profile__cancel")[0];

enrollBtn.addEventListener("click", openForm); // 프로필 등록 폼 열기
cancel.addEventListener("click", closeForm); // 프로필 등록 폼 닫기
image.addEventListener("change", previewImg); // 이미지 프리뷰

function previewImg() {
  const imageSrc = URL.createObjectURL(image.files[0]);
  document.getElementById("preview").src = imageSrc;
}

function openForm(e) {
  e.preventDefault();
  form.style.display = "flex";
}

function closeForm(e) {
  e.preventDefault();
  form.style.display = "none";
}
