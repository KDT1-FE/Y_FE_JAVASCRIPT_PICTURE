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
        <li class="villager-info-li"><p>${sex}</p></li>
        <li class="villager-info-li"><p>${birthday}</p></li>
        <li class="villager-info-li"><p>${personality}</p></li>
        <li class="villager-info-li"><p>${favoriteColor}</p></li>
      </ul>
    `;

    //div 추가
    villagerList.appendChild(villagerContainer);

    // img 가져오기
    const imageElement = villagerContainer.querySelector(".villager-img");
    const imageRef = storage.ref().child(engName + ".webp");
    imageRef
      .getDownloadURL()
      .then((url) => {
        imageElement.src = url;
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  });
});
