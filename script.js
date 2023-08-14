// script.js

// ...Firebase 초기화 코드 등...

const registerDogButton = document.getElementById("registerDogButton");
const modalContainer = document.getElementById("addDogDialog");
const closeModalButton = document.getElementById("closeModalButton");
const dialogRegisterDogButton = document.getElementById("dialogRegisterDogButton");
// 파일 입력 요소와 미리보기를 위한 이미지 요소 가져오기
const dogImageInput = document.getElementById("dogImageInput");
const imagePreview = document.getElementById("imagePreview");

registerDogButton.addEventListener("click", () => {
    modalContainer.style.display = "block"; // 모달 보이기
    imagePreviewText.style.display = "block";
    imagePreview.src = "#";
});

closeModalButton.addEventListener("click", () => {
    // 이미지 미리보기 초기화 & '이미지 선택' 텍스트 보이게 
    imagePreview.src = "#";
    imagePreviewText.style.display = "block";
    modalContainer.style.display = "none"; // 모달 숨기기
});

dialogRegisterDogButton.addEventListener("click", () => {
    // 등록 처리하는 코드 추가

    modalContainer.style.display = "none"; // 모달 숨기기
});

window.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
        modalContainer.style.display = "none"; // 모달 숨기기
    }
});

window.addEventListener("load", () => {
    // displayDogInfo(); 여기서 강아지 정보 표시 함수 호출 등을 추가하세요.
});

// 파일 선택 시 이미지 미리보기
const imagePreviewLabel = document.querySelector(".image-preview-circle span");

// 파일 선택 시 이미지 미리보기
dogImageInput.addEventListener("change", (event) => {
  const selectedImage = event.target.files[0];

  if (selectedImage) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      imagePreviewLabel.style.display = "none"; // 선택된 파일 없음 텍스트 숨기기
    };

    reader.readAsDataURL(selectedImage);
  }
});

// 이미지 미리보기 클릭 시 파일 선택 input 열기
imagePreviewLabel.addEventListener("click", () => {
  dogImageInput.click();
});

