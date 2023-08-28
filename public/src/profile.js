const urlParams = new URLSearchParams(window.location.search);
const villagerId = urlParams.get("id");

const storage = firebase.storage();
const profileInfoUl = document.querySelector(".profile-info-ul");

const db = firebase.firestore();
const villagerDocRef = db.collection("villager").doc(villagerId);

//프로필 container 생성 함수
function createProfileContainer(doc) {
  const data = doc.data();

  const {
    name,
    engName,
    sex,
    birthday,
    personality,
    favoriteColor,
    speechHabit,
    imageUrl,
  } = data;

  //ul 새로 만들기
  const profileContainer = document.createElement("ul");
  profileContainer.classList.add("villager-info");
  profileContainer.dataset.id = doc.id;

  //어떤 구조로 들어갈지
  profileContainer.innerHTML = `
      <li class="villager-info-name villager-info"><p>${name}</p></li>
      <li class="villager-info-engName villager-info"><p>${engName}</p></li>
      <li class="villager-info-sex villager-info"><p>${sex}</p></li>
      <li class="villager-info-birthday villager-info"><p>${birthday}</p></li>
      <li class="villager-info-personality villager-info"><p>${personality}</p></li>
      <li class="villager-info-favoriteColor villager-info"><p>${favoriteColor}</p></li>
      <li class="villager-info-speechHabit villager-info"><p>${speechHabit}</p></li>
  `;

  //div 추가
  profileInfoUl.appendChild(profileContainer);

  //img 가져오기
  const imageElement = document.getElementById("villager-img");

  //로딩
  const loadingElement = document.createElement("div");
  loadingElement.classList.add("loading");
  imageElement.parentElement.insertBefore(loadingElement, imageElement);

  if (imageUrl) {
    imageElement.src = imageUrl;
    imageElement.onload = () => {
      loadingElement.remove();
    };
  }
}

//P에서 input으로 변경해주는 함수
function createPtoInput(pTag) {
  const input = document.createElement("input");
  input.value = pTag.textContent;
  const field = pTag.parentElement.classList[0].replace("villager-info-", "");
  input.id = field; //필드 이름을 id로 설정
  pTag.textContent = "";
  pTag.appendChild(input);

  //스타일
  input.style.height = "1.3rem";
  input.style.width = "10rem";
  input.style.border = "none";
  input.style.borderBottom = "solid 1px #547a66";
  input.style.backgroundColor = " #00ff0000";
  input.style.fontSize = "1.2rem";

  //focus되었을 때
  input.addEventListener("focus", () => {
    input.style.outline = "none";
    input.style.borderBottom = "solid 3.5px #547a66";
    input.style.transition = "0.3s";
  });

  //focus 해제 시
  input.addEventListener("blur", () => {
    input.style.outline = "";
    input.style.borderBottom = "solid 1px #547a66";
  });
}

villagerDocRef.get().then((doc) => {
  if (doc.exists) {
    createProfileContainer(doc);
  }
});

//데이터 업데이트해주는 함수
function updateData(updatedData, profileContainer) {
  try {
    //firestore 업데이트
    villagerDocRef.update(updatedData);

    //새 정보로 업데이트
    Object.keys(updatedData).forEach((field) => {
      const pTag = profileContainer.querySelector(`.villager-info-${field} p`);
      if (pTag) {
        pTag.textContent = updatedData[field];
      }
    });
  } catch (error) {
    console.error("오류: ", error);
  }
}

//이미지 프리뷰 함수
function previewImage(event) {
  file = event.target.files[0];
  imgChanged = true;

  if (file) {
    //사진 선택만 하고 저장은 하지 않았을 때를 대비해 e에서 파일 가져옴
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageElement = document.querySelector(".villager-img");
      imageElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

//이미지 업데이트해주는 함수
async function updateImage(imgChanged) {
  if (imgChanged) {
    try {
      //예전 사진 삭제
      const currentDoc = await villagerDocRef.get();
      const currentData = currentDoc.data();
      const oldImageUrl = currentData.imageUrl;

      if (oldImageUrl) {
        const storageRef = storage.refFromURL(oldImageUrl);
        await storageRef.delete();
      }

      //storage에 이미지 업로드
      const storageRef = storage.ref(`${villagerId}`);
      const imageRef = await storageRef.put(file);
      const imageUrl = await imageRef.ref.getDownloadURL();

      //firestore에서 이미지 URL 업데이트
      await villagerDocRef.update({ imageUrl });
    } catch (error) {
      console.error("이미지 업로드 오류: ", error);
    }
  }
}

//데이터 유효성 검사 함수
function inputValid(inputElements) {
  let isInputValid = true;
  const updatedData = {};

  for (let i = 0; i < inputElements.length; i++) {
    const input = inputElements[i];
    const field = input.id;
    const value = input.value.trim();

    if (value === "") {
      isInputValid = false;
      break;
    }
    updatedData[field] = value;
  }

  return { isInputValid, updatedData };
}

//수정 기능
const editBtn = document.querySelector(".edit-btn");
let file;
let imgChanged = false;

editBtn.addEventListener("click", async () => {
  //이미지 관련 요소
  const imageUploadInput = document.querySelector(".image-upload");

  if (editBtn.textContent === "정보 수정") {
    //button text content가 수정완료일 때 => 수정모드
    editBtn.textContent = "수정 완료";
    imageUploadInput.style.display = "block";

    //profileContainer 내부의 모든 p 태그 선택
    const pTags = document.querySelectorAll(".villager-info p");

    //각 p 태그를 input으로 교체
    pTags.forEach((pTag) => {
      createPtoInput(pTag);
    });

    //image 수정
    imageUploadInput.addEventListener("change", async (event) => {
      previewImage(event);
    });
  } else if (editBtn.textContent === "수정 완료") {
    const profileContainer = document.querySelector(".villager-info");
    //profileContainer 내부의 모든 input 엘리먼트 선택
    const inputElements = profileContainer.querySelectorAll("input");
    const { isInputValid, updatedData } = inputValid(inputElements);

    if (!isInputValid) {
      alert("모든 정보를 채워주세요!");
      return;
    }

    editBtn.textContent = "정보 수정";
    imageUploadInput.style.display = "none";

    updateData(updatedData, profileContainer);
    updateImage(imgChanged);

    alert("정보 수정이 완료되었습니다!");
  }
});

window.addEventListener("beforeunload", (event) => {
  if (editBtn.textContent === "수정 완료") {
    //수정 모드일 때 페이지 이동을 막음
    event.preventDefault();
    //alert 표시
    event.returnValue = "정보 수정 중입니다. 페이지를 나가시겠습니까?";
  }
});
