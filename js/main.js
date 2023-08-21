const AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const toogleBtn = document.querySelector(".navbar__tooglebtn");

// 미리보기 함수
document.getElementById("fileUpload").addEventListener("change", function (e) {
  // 파일이 선택된 경우
  if (e.target.files && e.target.files[0]) {
    // FileReader 객체 생성
    const reader = new FileReader();

    // 파일 읽기가 완료된 경우 실행되는 이벤트
    reader.onload = function (e) {
      // 미리보기 요소에 이미지를 표시
      document.querySelector(".modal-box__inputImg").innerHTML = `<img src="${e.target.result}" alt="Image Preview" class="preview-image">`;
    };

    // 파일을 읽기 위해 readAsDataURL 함수 사용
    reader.readAsDataURL(e.target.files[0]);
  }
});

// 이미지 드래그 방지
document.addEventListener("dragstart", function (event) {
  if (event.target.tagName == "IMG") {
    event.preventDefault();
  }
});
