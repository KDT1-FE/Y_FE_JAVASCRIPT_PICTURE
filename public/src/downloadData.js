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
  });
});
