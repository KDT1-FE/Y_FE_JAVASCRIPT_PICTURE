const storage = firebase.storage();
const db = firebase.firestore();

const villagerList = document.querySelector(".villagers-list");

const collectionRef = db.collection("villager");
collectionRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const name = data.name;
    const engName = data.engName;
    const sex = data.sex;
    const birthday = data.birthday;
    const personality = data.personality;
    const favoriteColor = data.favoriteColor;

    // div 새로 만들기
    const villagerContainer = document.createElement("div");
    villagerContainer.classList.add("villager");
    villagerContainer.dataset.id = doc.id;

    // 어떤 구조로 들어갈지
    villagerContainer.innerHTML = `
    <ul class="villager-info-ul">
      <li class="villager-info-li">
        <img class="villager-img" src="" />
      </li>
      <li class="villager-info-li"><p>${name}</p></li>
      <li class="villager-info-li"><p class="sex">${sex}</p></li>
      <li class="villager-info-li"><p>${birthday}</p></li>
      <li class="villager-info-li"><p>${personality}</p></li>
      <li class="villager-info-li"><p>${favoriteColor}</p></li>
    </ul>
    <div class="delete-villager">
      <button class="delete-button">주민 삭제</button>
    </div>
    `;

    // div 추가
    villagerList.appendChild(villagerContainer);

    //성별에 따라 글자 색 다르게
    const sexElement = villagerContainer.querySelector(".sex");
    if (sex === "여성") {
      sexElement.style.color = "pink";
    } else if (sex === "남성") {
      sexElement.style.color = "skyblue";
    }

    // img 가져오기
    const imageElement = villagerContainer.querySelector(".villager-img");
    const imageFormats = [".webp", ".png", ".jpeg", ".jpg"];
    let imageFound = false;

    imageFormats.forEach((format) => {
      if (!imageFound) {
        const imageRef = storage.ref().child(engName + format);
        imageRef
          .getDownloadURL()
          .then((url) => {
            imageElement.src = url;
            imageFound = true;
          })
          .catch((error) => {});
      }
    });

    // "주민 삭제" 버튼 기능
    const deleteButton = villagerContainer.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      // 삭제할 주민의 ID 가져오기
      const villagerId = doc.id;

      // firestore에서 데이터 삭제
      db.collection("villager")
        .doc(villagerId)
        .delete()
        .then(() => {
          // Storage에서 이미지 삭제
          imageFormats.forEach((format) => {
            const imageRef = storage.ref().child(engName + format);
            imageRef
              .delete()
              .then()
              .catch((error) => {
                console.error("이미지 삭제 오류:", error);
              });
          });

          // UI에서 해당 주민 컨테이너 제거
          villagerList.removeChild(villagerContainer);
          alert("주민이 성공적으로 삭제되었습니다.");
        })
        .catch((error) => {
          console.error("주민 삭제 오류:", error);
        });
    });

    const villagerInfoUl = villagerContainer.querySelector(".villager-info-ul");
    villagerInfoUl.addEventListener("click", (event) => {
      const villagerId = villagerContainer.getAttribute("data-id");
      window.location.href = `profile.html?id=${villagerId}`;
    });
  });
});
