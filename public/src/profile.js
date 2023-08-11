const urlParams = new URLSearchParams(window.location.search);
const villagerId = urlParams.get("id");

const storage = firebase.storage();
const profileInfoUl = document.querySelector(".profile-info-ul");

const db = firebase.firestore();
const villagerDocRef = db.collection("villager").doc(villagerId);

villagerDocRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();

      const name = data.name;
      const engName = data.engName;
      const sex = data.sex;
      const birthday = data.birthday;
      const personality = data.personality;
      const favoriteColor = data.favoriteColor;
      const speechHabit = data.speechHabit;

      // ul 새로 만들기
      const profileContainer = document.createElement("ul");
      profileContainer.classList.add("villager-info");
      profileContainer.dataset.id = doc.id;

      // 어떤 구조로 들어갈지
      profileContainer.innerHTML = `
        <li class="villager-info-li"><p>${name}</p></li>
        <li class="villager-info-li"><p>${engName}</p></li>
        <li class="villager-info-li"><p>${sex}</p></li>
        <li class="villager-info-li"><p>${birthday}</p></li>
        <li class="villager-info-li"><p>${personality}</p></li>
        <li class="villager-info-li"><p>${favoriteColor}</p></li>
        <li class="villager-info-li"><p>${speechHabit}</p></li>
    `;

      // div 추가
      profileInfoUl.appendChild(profileContainer);

      // img 가져오기
      const imageFormats = ["webp", "png", "jpeg", "jpg"];
      const imageElement = document.getElementById("villager-img");
      let imageFound = false;

      imageFormats.forEach((format) => {
        if (!imageFound) {
          const imageRef = storage.ref().child(`${engName}.${format}`);
          imageRef
            .getDownloadURL()
            .then((url) => {
              imageElement.src = url;
              imageFound = true;
            })
            .catch((error) => {});
        }
      });
    }
  })
  .catch((error) => {});
