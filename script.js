import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref as dbRef, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"; 



const firebaseConfig = {
  apiKey: "AIzaSyDbIZHxlYJfqnLaXxXUpAUsPY_k6C3CvJY",
  authDomain: "js-project-b9579.firebaseapp.com",
  projectId: "js-project-b9579",
  storageBucket: "js-project-b9579.appspot.com",
  messagingSenderId: "364495315069",
  appId: "1:364495315069:web:85a6cb78f642b054d35114",
  measurementId: "G-QNNZXRNBFJ"
};

// Firebase SDK 초기화
const app = initializeApp(firebaseConfig);

const registerDogButton = document.getElementById("registerDogButton");
const modalContainer = document.getElementById("addDogDialog");
const closeModalButton = document.getElementById("closeModalButton");
const dialogRegisterDogButton = document.getElementById("dialogRegisterDogButton");
// 파일 입력 요소와 미리보기를 위한 이미지 요소 가져오기
const dogImageInput = document.getElementById("dogImageInput");
const imagePreview = document.getElementById("imagePreview");
const imagePreviewText = document.getElementById("imagePreviewText");


const dogNameInput = document.getElementById("dogNameInput");


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


  const selectedImage = dogImageInput.files[0];

  if (!selectedImage) {
    console.error("이미지가 선택되지 않았습니다.");
    return; // 이미지가 선택되지 않은 경우 함수 종료
  }

   // Firebase의 Cloud Storage에 이미지 업로드
   const storage = getStorage(app); // Firebase Storage 객체 가져오기
   const storageRef = ref(storage, `dog_images/${dogImageInput.files[0].name}`);
   const uploadTask = uploadBytes(storageRef, dogImageInput.files[0]);
 
   console.log(storageRef);
 
   // 이미지 업로드가 완료된 후, 이미지 URL을 가져오기 위한 작업 수행
   uploadTask
     .then((snapshot) => {
       // 이미지 업로드가 완료된 후, 이미지 URL을 가져오기 위한 작업 수행
       return getDownloadURL(snapshot.ref).then((imageUrl) => {
         // 이미지 URL 가져오기가 성공적으로 완료된 경우, Cloud Firestore에 데이터 추가
         const db = getFirestore(app);
         return addDoc(collection(db, "dogs"), {
           name: dogNameInput.value,
           breed: dogBreedInput.value,
           birthday: dogBirthdayInput.value,
           gender: dogGenderInput.value,
           imageUrl: imageUrl, // 이미지 URL 값 사용
         });
       });
     })
     .then(() => {
       // 데이터 추가가 완료된 경우
       console.log("강아지 정보가 성공적으로 등록되었습니다.");
 
       // 입력한 정보 초기화
       dogNameInput.value = "";
       dogBreedInput.value = "";
       dogBirthdayInput.value = "";
       dogGenderInput.value = "male";
       imagePreview.src = "#";
       imagePreviewText.style.display = "block";
       modalContainer.style.display = "none";
     })
     .catch((error) => {
       console.error("강아지 정보 등록에 실패했습니다:", error);
     });
 
  // 다이얼로그 숨기기
  modalContainer.style.display = "none";
});
