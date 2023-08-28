const storage = firebase.storage();
const db = firebase.firestore();

const villagerList = document.querySelector(".villagers-list");

const collectionRef = db.collection("villager");
let lastVisibleDoc = null;
let visibleVillagers = 4;
const loadMoreThreshold = 2;
let loadingMore = false;

//데이터 가져오는 함수
const getData = (doc) => {
  const { name, sex, birthday, personality, favoriteColor, imageUrl } =
    doc.data();

  return {
    name,
    sex,
    birthday,
    personality,
    favoriteColor,
    imageUrl,
  };
};

//주민 리스트 생성
const makeVillagerList = (data) => {
  data.forEach((doc) => {
    const { name, sex, birthday, personality, favoriteColor, imageUrl } =
      getData(doc);

    const villagerContainer = document.createElement("div");
    villagerContainer.classList.add("villager");
    villagerContainer.dataset.id = doc.id;

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

    villagerList.appendChild(villagerContainer);

    const sexElement = villagerContainer.querySelector(".sex");
    const colorPalette = {
      sex: {
        남성: "#A8CAD5",
        여성: "#D5A8B8",
      },
    };
    sexElement.style.color = colorPalette.sex[sex];

    deleteVillager(villagerContainer, doc);
    navigationProfile(villagerContainer);
  });

  lastVisibleDoc = data[data.length - 1];
};

//주민 삭제
const deleteVillager = (villagerContainer, doc) => {
  const deleteButton = villagerContainer.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    const villagerId = doc.id;

    try {
      await db.collection("villager").doc(villagerId).delete();
      const imageRef = storage.refFromURL(doc.data().imageUrl);
      await imageRef.delete();

      villagerList.removeChild(villagerContainer);
      alert(`주민이 성공적으로 삭제되었습니다!`);
    } catch (error) {
      console.error("주민 삭제 오류:", error);
    }
  });
};

//해당 주민 프로필로 이동
const navigationProfile = (villagerContainer) => {
  const villagerInfoUl = villagerContainer.querySelector(".villager-info-ul");
  villagerInfoUl.addEventListener("click", () => {
    const villagerId = villagerContainer.getAttribute("data-id");
    window.location.href = `profile.html?id=${villagerId}`;
  });
};

const loadMoreVillagers = () => {
  loadingMore = true;
  collectionRef
    .orderBy("name")
    .startAfter(lastVisibleDoc)
    .limit(visibleVillagers)
    .get()
    .then((querySnapshot) => {
      loadingMore = false;
      if (!querySnapshot.empty) {
        makeVillagerList(querySnapshot.docs);
      }
    })
    .catch((error) => {
      loadingMore = false;
      console.error("추가 주민 불러오기 오류:", error);
    });
};

collectionRef
  .orderBy("name")
  .limit(visibleVillagers)
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      const noVillagersMessage = document.createElement("h1");
      noVillagersMessage.className = "noVillager-message";
      noVillagersMessage.textContent =
        "등록된 주민이 없습니다! 새로운 주민을 등록해주세요";
      villagerList.appendChild(noVillagersMessage);
    } else {
      makeVillagerList(querySnapshot.docs);
    }
  })
  .catch((error) => {
    console.error("주민 불러오기 오류:", error);
  });

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  if (
    !loadingMore &&
    scrollPosition + windowHeight >= pageHeight - loadMoreThreshold &&
    lastVisibleDoc
  ) {
    loadMoreVillagers();
  }
});
