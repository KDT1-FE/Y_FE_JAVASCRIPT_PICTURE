const storage = firebase.storage();
const db = firebase.firestore();

const villagerList = document.querySelector(".villagers-list");

const collectionRef = db.collection("villager");
collectionRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const name = data.name;
    const sex = data.sex;
    const birthday = data.birthday;
    const personality = data.personality;
    const favoriteColor = data.favoriteColor;
    const imageUrl = data.imageUrl;

    // div 새로 만들기
    const villagerContainer = document.createElement("div");
    villagerContainer.classList.add("villager");
    villagerContainer.dataset.id = doc.id;

    // 어떤 구조로 들어갈지
    villagerContainer.innerHTML = `
    <ul class="villager-info-ul">
      <li class="villager-info-li">
      <img class="villager-img" src="${imageUrl}" />
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
      sexElement.style.color = "#D5A8B8";
    } else if (sex === "남성") {
      sexElement.style.color = "#A8CAD5";
    }

    // "주민 삭제" 버튼 기능
    const deleteButton = villagerContainer.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
      // 삭제할 주민의 ID 가져오기
      const villagerId = doc.id;

      try {
        //firestore에서 데이터 삭제
        await db.collection("villager").doc(villagerId).delete();

        //storage에서 이미지 삭제
        const imageRef = storage.refFromURL(imageUrl);
        await imageRef.delete();

        //해당 주민 컨테이너 제거
        villagerList.removeChild(villagerContainer);
        alert(`주민이 성공적으로 삭제되었습니다!`);
      } catch (error) {
        console.error("주민 삭제 오류:", error);
      }
    });

    const villagerInfoUl = villagerContainer.querySelector(".villager-info-ul");
    villagerInfoUl.addEventListener("click", () => {
      const villagerId = villagerContainer.getAttribute("data-id");
      window.location.href = `profile.html?id=${villagerId}`;
    });
  });
});
