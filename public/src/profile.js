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
let file;

editBtn.addEventListener("click", async () => {
  //이미지 관련 요소
  const imageUploadInput = document.querySelector(".image-upload");

  if (editBtn.textContent === "정보 수정") {
    //button text content가 수정완료일 때 => 수정모드
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
    imageUploadInput.addEventListener("change", async (event) => {
      file = event.target.files[0];

      if (file) {
        //사진 선택만 하고 저장은 하지 않았을 때를 대비해 e에서 파일 가져옴
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageElement = document.querySelector(".villager-img");
          imageElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  } else if (editBtn.textContent === "수정 완료") {
    editBtn.textContent = "정보 수정";
    imageUploadInput.style.display = "none";
    alert("정보가 수정되었습니다!");

    const profileContainer = document.querySelector(".villager-info");

    //profileContainer 내부의 모든 input 엘리먼트 선택
    const inputElements = profileContainer.querySelectorAll("input");

    //업데이트된 정보를 저장할 객체 생성
    const updatedData = {};

    //input을 반복하며 객체 업데이트
    inputElements.forEach((input) => {
      const field = input.id;
      updatedData[field] = input.value;
    });

    try {
      //firestore 업데이트
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

      try {
        //예전 사진 삭제
        const currentDoc = await villagerDocRef.get();
        const currentData = currentDoc.data();
        const oldImageUrl = currentData.imageUrl;

        if (oldImageUrl) {
          const storageRef = storage.refFromURL(oldImageUrl);
          await storageRef.delete();
        }

        // Storage에 이미지 업로드
        const storageRef = storage.ref(`${villagerId}`);
        const imageRef = await storageRef.put(file);
        const imageUrl = await imageRef.ref.getDownloadURL();

        // Firestore에서 이미지 URL 업데이트
        await villagerDocRef.update({ imageUrl });
      } catch (error) {
        console.error("이미지 업로드 오류: ", error);
      }
    } catch (error) {
      console.error("오류: ", error);
    }
  }
});

window.addEventListener("beforeunload", (event) => {
  if (editBtn.textContent === "수정 완료") {
    //수정 모드일 때 페이지 이동을 막음
    event.preventDefault();
    // alert 표시
    event.returnValue = "정보 수정 중입니다. 페이지를 나가시겠습니까?";
  }
});
