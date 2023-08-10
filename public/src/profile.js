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
      console.log(data);

      const name = data.name;
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
        <li class="villager-info-li"><p>${sex}</p></li>
        <li class="villager-info-li"><p>${birthday}</p></li>
        <li class="villager-info-li"><p>${personality}</p></li>
        <li class="villager-info-li"><p>${favoriteColor}</p></li>
        <li class="villager-info-li"><p>${speechHabit}</p></li>
    `;

      // div 추가
      profileInfoUl.appendChild(profileContainer);

      // 사진 추가
      const imageRef = storage.ref().child(`${villagerId}.webp`);

      imageRef
        .getDownloadURL()
        .then((url) => {
          const villagerImageElement = document.getElementById("villager-img");
          villagerImageElement.src = url;
        })
        .catch((error) => {
          console.error("Error getting image download URL:", error);
        });
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
