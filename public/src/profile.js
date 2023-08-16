const urlParams = new URLSearchParams(window.location.search);
const villagerId = urlParams.get("id");

const storage = firebase.storage();
const profileInfoUl = document.querySelector(".profile-info-ul");

const db = firebase.firestore();
const villagerDocRef = db.collection("villager").doc(villagerId);

villagerDocRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();

    const name = data.name;
    const engName = data.engName;
    const sex = data.sex;
    const birthday = data.birthday;
    const personality = data.personality;
    const favoriteColor = data.favoriteColor;
    const speechHabit = data.speechHabit;
    const imageUrl = data.imageUrl;

    // ul 새로 만들기
    const profileContainer = document.createElement("ul");
    profileContainer.classList.add("villager-info");
    profileContainer.dataset.id = doc.id;

    // 어떤 구조로 들어갈지
    profileContainer.innerHTML = `
        <li class="villager-info-name"><p>${name}</p></li>
        <li class="villager-info-engName"><p>${engName}</p></li>
        <li class="villager-info-sex"><p>${sex}</p></li>
        <li class="villager-info-birthday"><p>${birthday}</p></li>
        <li class="villager-info-personality"><p>${personality}</p></li>
        <li class="villager-info-favoriteColor"><p>${favoriteColor}</p></li>
        <li class="villager-info-speechHabit"><p>${speechHabit}</p></li>
    `;

    // div 추가
    profileInfoUl.appendChild(profileContainer);

    // img 가져오기
    const imageElement = document.getElementById("villager-img");
    if (imageUrl) {
      imageElement.src = imageUrl;
    }
  }
});

//수정 기능
const editBtn = document.querySelector(".edit-btn");

editBtn.addEventListener("click", () => {
  //이미지 관련 요소
  const imageUploadInput = document.querySelector(".image-upload");

  if (editBtn.textContent === "정보 수정") {
    editBtn.textContent = "수정 완료";
    imageUploadInput.style.display = "block";

    // profileContainer 내부의 모든 p 태그 선택
    const pTags = document.querySelectorAll(".villager-info p");

    // 각 p 태그를 input으로 교체
    pTags.forEach((pTag) => {
      const input = document.createElement("input");
      input.value = pTag.textContent;
      const field = pTag.parentElement.classList[0].replace(
        "villager-info-",
        ""
      );
      input.id = field; // 필드 이름을 id로 설정
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
    });

    //image 수정
    imageUploadInput.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        try {
          // Storage에 이미지 업로드
          const storageRef = storage.ref(`${villagerId}`);
          storageRef.put(file);

          // Storage의 업로드된 이미지 URL을 가져와서 표시
          const imageUrl = storageRef.getDownloadURL();
          const imageElement = document.getElementById("villager-img");
          imageElement.src = imageUrl;

          // Firestore에서 이미지 URL 업데이트
          villagerDocRef.update({ imageUrl });
        } catch (error) {
          console.error("이미지 업로드 오류: ", error);
        }
      }
    });
  } else if (editBtn.textContent === "수정 완료") {
    editBtn.textContent = "정보 수정";
    imageUploadInput.style.display = "none";

    const profileContainer = document.querySelector(".villager-info");

    // profileContainer 내부의 모든 input 엘리먼트 선택
    const inputElements = profileContainer.querySelectorAll("input");

    // 업데이트된 정보를 저장할 객체 생성
    const updatedData = {};

    // input 엘리먼트를 반복하며 객체 업데이트
    inputElements.forEach((input) => {
      const field = input.id;
      updatedData[field] = input.value;
    });

    try {
      // Firestore 문서를 새 데이터로 업데이트
      villagerDocRef.update(updatedData);

      //새 정보로 업데이트
      Object.keys(updatedData).forEach((field) => {
        const pTag = profileContainer.querySelector(
          `.villager-info-${field} p`
        );
        if (pTag) {
          pTag.textContent = updatedData[field];
        }
      });
    } catch (error) {
      console.error("문서 업데이트 오류: ", error);
    }
  }
});
