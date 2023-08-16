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

// dialogRegisterDogButton.addEventListener("click", () => {
//   // 등록 처리하는 코드 추가
  
//   // 강아지 정보 생성
//   const dogInfo = document.createElement("div");
//   dogInfo.className = "dog-info";

//   // 체크박스 생성
//   const checkBox = document.createElement("input");
//   checkBox.type = "checkbox";
//   checkBox.classList.add("dog-checkbox");
  
//   // 체크박스를 dogInfo에 추가
//   dogInfo.appendChild(checkBox);

//   // 강아지 정보 내용 생성
//   const dogImage = document.createElement("img");
//   dogImage.src = imagePreview.src;
//   dogImage.alt = "강아지 사진";
//   dogImage.style.borderRadius = "50%"; // 동그라미 모양으로 표시

//   const dogName = document.createElement("span");
//   dogName.textContent = dogNameInput.value;

//   const dogBreed = document.createElement("span");
//   dogBreed.textContent = dogBreedInput.value;

//   const dogBirthday = document.createElement("span");
//   dogBirthday.textContent = dogBirthdayInput.value;

//   const dogGender = document.createElement("span");
//   dogGender.textContent = dogGenderInput.value;

//   // 생성한 엘리먼트들을 강아지 정보 엘리먼트에 추가
//   dogInfo.appendChild(dogImage);
//   dogInfo.appendChild(dogName);
//   dogInfo.appendChild(dogBreed);
//   dogInfo.appendChild(dogBirthday);
//   dogInfo.appendChild(dogGender);

//   // 강아지 정보 엘리먼트를 dogInfoContainer에 추가
//   const dogInfoContainer = document.getElementById("dogInfoContainer");
//   dogInfoContainer.appendChild(dogInfo);

//   // 다이얼로그 숨기기
//   modalContainer.style.display = "none";
// });


dialogRegisterDogButton.addEventListener("click", () => {
  // 등록 처리하는 코드 추가

  // 강아지 정보 생성
  const dogInfo = document.createElement("div");
  dogInfo.className = "dog-info";

  // 강아지 체크박스 생성
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "dog-checkbox";

  // 강아지 정보 컨테이너 생성
  const infoContainer = document.createElement("div");
  infoContainer.className = "info-container";

  // 이미지 컨테이너 생성
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  // 강아지 정보 내용 생성
  const dogImage = document.createElement("img");
  dogImage.src = imagePreview.src;
  dogImage.alt = "강아지 사진";
  dogImage.style.borderRadius = "50%";

  const dogName = document.createElement("span");
  dogName.textContent = dogNameInput.value;

  const dogBreed = document.createElement("span");
  dogBreed.textContent = dogBreedInput.value;

  const dogBirthday = document.createElement("span");
  dogBirthday.textContent = dogBirthdayInput.value;

  const dogGender = document.createElement("span");
  dogGender.textContent = dogGenderInput.value;

  // 생성한 엘리먼트들을 이미지 컨테이너와 강아지 정보 컨테이너에 추가
  imageContainer.appendChild(dogImage);
  infoContainer.appendChild(checkbox);
  infoContainer.appendChild(imageContainer);
  infoContainer.appendChild(dogName);
  infoContainer.appendChild(dogBreed);
  infoContainer.appendChild(dogBirthday);
  infoContainer.appendChild(dogGender);

  // 강아지 정보 컨테이너를 강아지 정보 엘리먼트에 추가
  dogInfo.appendChild(infoContainer);

  // 강아지 정보 엘리먼트를 dogInfoContainer에 추가
  const dogInfoContainer = document.getElementById("dogInfoContainer");
  dogInfoContainer.appendChild(dogInfo);

  // 다이얼로그 숨기기
  modalContainer.style.display = "none";
});
