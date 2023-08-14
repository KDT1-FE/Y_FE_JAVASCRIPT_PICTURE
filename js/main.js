import {
  btn_openEnrollForm,
  enrollForm,
  btn_addProfile,
  btn_closeEnrollForm,
  enroll_photo,
} from "/js/constant.js";

import { uploadProfileToS3 } from "./api/uploadProfile.js";
import { listProfileFromS3 } from "./api/listProfile.js";

// 메인페이지 기본 이벤트
btn_openEnrollForm.addEventListener("click", openForm); // 프로필 등록 폼 열기
btn_closeEnrollForm.addEventListener("click", closeForm); // 프로필 등록 폼 닫기
enroll_photo.addEventListener("change", previewImg); // 이미지 프리뷰

// API 이벤트 및 함수
listProfileFromS3(); // 프로필 불러오기 (Read)
btn_addProfile.addEventListener("click", uploadProfileToS3); // s3로 프로필업로드

// 메인페이지 기본 이벤트 함수
function previewImg() {
  const imageSrc = URL.createObjectURL(enroll_photo.files[0]);
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
