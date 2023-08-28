const storage = firebase.storage();
const db = firebase.firestore();

const villagerList = document.querySelector(".villagers-list");

const collectionRef = db.collection("villager");
let lastVisibleDoc = null;
let visibleVillagers = 4;
const loadMoreThreshold = 2;
let loadingMore = false;

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
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const { name, sex, birthday, personality, favoriteColor, imageUrl } =
            data;

          //div 새로 만들기
          const villagerContainer = document.createElement("div");
          villagerContainer.classList.add("villager");
          villagerContainer.dataset.id = doc.id;

          //어떤 구조로 들어갈지
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

          //div 추가
          villagerList.appendChild(villagerContainer);

          //성별에 따라 글자 색 다르게
          const sexElement = villagerContainer.querySelector(".sex");

          const colorPalette = {
            sex: {
              남성: "#A8CAD5",
              여성: "#D5A8B8",
            },
          };
          sexElement.style.color = colorPalette.sex[sex];

          //"주민 삭제" 버튼 기능
          const deleteButton =
            villagerContainer.querySelector(".delete-button");
          deleteButton.addEventListener("click", async () => {
            //삭제할 주민의 ID 가져오기
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

          const villagerInfoUl =
            villagerContainer.querySelector(".villager-info-ul");
          villagerInfoUl.addEventListener("click", () => {
            const villagerId = villagerContainer.getAttribute("data-id");
            window.location.href = `profile.html?id=${villagerId}`;
          });
        });

        lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
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
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const { name, sex, birthday, personality, favoriteColor, imageUrl } =
          data;

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
        const colorPalette = {
          sex: {
            남성: "#A8CAD5",
            여성: "#D5A8B8",
          },
        };
        sexElement.style.color = colorPalette.sex[sex];

        //"주민 삭제" 버튼 기능
        const deleteButton = villagerContainer.querySelector(".delete-button");
        deleteButton.addEventListener("click", async () => {
          //삭제할 주민의 ID 가져오기
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

        const villagerInfoUl =
          villagerContainer.querySelector(".villager-info-ul");
        villagerInfoUl.addEventListener("click", () => {
          const villagerId = villagerContainer.getAttribute("data-id");
          window.location.href = `profile.html?id=${villagerId}`;
        });
      });
      lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    }
  })
  .catch((error) => {
    console.error("주민 불러오기 오류:", error);
  });

//무한 스크롤
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
