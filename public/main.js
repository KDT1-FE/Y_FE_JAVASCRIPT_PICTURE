const db = firebase.firestore();
const storage = firebase.storage();
const container = document.querySelector(".soldier-container");

let soldierDB = [];

const paintSoldierElement = (dataArray) => {
  container.innerHTML = "";

  if (dataArray.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.classList.add("no-results");
    noResultsMessage.innerText = "검색 결과가 없습니다.";
    noResultsMessage.style.width = "100%";
    noResultsMessage.style.fontSize = "2rem";
    noResultsMessage.style.color = "var(--color-primary)";
    noResultsMessage.style.textAlign = "center";
    container.appendChild(noResultsMessage);
    return;
  }

  dataArray.forEach((soldier, index) => {
    const soldierDiv = document.createElement("div");
    soldierDiv.classList.add("soldier");
    soldierDiv.id = index;
    if (index % 2) soldierDiv.classList.add("right");
    else soldierDiv.classList.add("left");

    soldierDiv.addEventListener("click", () => {
      if (deleteMode) {
        if (soldierDiv.classList.contains("selected")) {
          soldierDiv.classList.remove("selected");
          const selectedIndex = selectedIndexes.indexOf(index);
          if (selectedIndex !== -1) {
            selectedIndexes.splice(selectedIndex, 1);
          }
        } else {
          soldierDiv.classList.add("selected");
          selectedIndexes.push(index);
        }
      }
    });
    const soldierPhotoDiv = document.createElement("div");
    soldierPhotoDiv.classList.add("soldier-photo");
    if (soldier.사진) {
      const img = document.createElement("img");
      img.src = soldier.사진;
      soldierPhotoDiv.appendChild(img);
      if (index > 5) {
        img.style.loading = "lazy";
      }
    } else {
      const img = document.createElement("img");
      img.src = "";
      img.style.display = "none";
      soldierPhotoDiv.appendChild(img);
    }
    soldierDiv.appendChild(soldierPhotoDiv);

    const soldierInfoDiv = document.createElement("div");
    soldierInfoDiv.classList.add("soldier-info");

    const 이름Div = document.createElement("div");
    이름Div.classList.add("이름");
    이름Div.innerText = soldier.이름 ? soldier.이름 : "공석";
    soldierInfoDiv.appendChild(이름Div);

    const 부서Div = document.createElement("div");
    부서Div.classList.add("부서");
    부서Div.innerText = "부서 : " + soldier.부서;
    soldierInfoDiv.appendChild(부서Div);

    const 직급Div = document.createElement("div");
    직급Div.classList.add("직급");
    직급Div.innerText = "직급 : " + soldier.직급;
    soldierInfoDiv.appendChild(직급Div);

    const 생년월일Div = document.createElement("div");
    생년월일Div.classList.add("생년월일");
    생년월일Div.innerText = "생년월일 : " + soldier.생년월일;
    soldierInfoDiv.appendChild(생년월일Div);

    soldierDiv.appendChild(soldierInfoDiv);

    const 수정Btn = document.createElement("button");
    수정Btn.classList.add("edit-button");
    수정Btn.innerText = "수정하기";
    soldierDiv.appendChild(수정Btn);

    수정Btn.addEventListener("click", () => {
      const soldierDiv = 수정Btn.closest(".soldier");
      const 인덱스 = soldierDiv.id;
      const 사진 = soldierDiv.querySelector("img").src;
      const 이름 = soldierDiv.querySelector(".이름").textContent;
      const 부서 = soldierDiv.querySelector(".부서").textContent.slice(5);
      const 직급 = soldierDiv.querySelector(".직급").textContent.slice(5);
      const 생년월일 = soldierDiv
        .querySelector(".생년월일")
        .textContent.slice(7);

      openEditModal(
        사진,
        이름 === "공석" ? "" : 이름,
        부서,
        직급,
        생년월일,
        인덱스
      );
    });

    container.appendChild(soldierDiv);
  });
};

// 무한 스크롤을 통한 Data fetching

const batchSize = 10; // 한 번에 가져올 데이터 개수
let lastVisibleDoc = null; // 마지막으로 보인 문서
let loading = false; // 데이터를 불러오는 중인지 여부

// 로딩 요소를 생성하여 화면에 추가
const loadingElement = document.createElement("div");
loadingElement.classList.add("loading");

// 원을 추가하는 요소 생성
const circleElement = document.createElement("img");
circleElement.classList.add("circle");
circleElement.src = "./assets/images/hoguk.jpg";

// 텍스트 노드 생성
const textNode = document.createTextNode("로딩 중...");

// 로딩 요소 안에 원과 텍스트 노드 추가
loadingElement.appendChild(textNode);
loadingElement.appendChild(circleElement);

// 로딩 요소를 body에 추가
document.body.appendChild(loadingElement);

async function fetchNextBatchWithDelay() {
  if (loading) return; // 이미 데이터를 불러오는 중인 경우 중복 요청 방지
  loading = true;

  loadingElement.style.display = "flex"; // 로딩 요소 표시

  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    let query = db.collection("user").orderBy("timestamp").limit(batchSize);

    if (lastVisibleDoc) {
      query = query.startAfter(lastVisibleDoc);
    }

    const snapshot = await query.get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        soldierDB.push(doc.data());
      });

      lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      paintSoldierElement(soldierDB);
    }
  } catch (error) {
    console.error("Fetching Error:", error);
  }

  loadingElement.style.display = "none";
  loading = false;
}

// 처음 데이터 가져오기
fetchNextBatchWithDelay();

// 스크롤 이벤트 감지
window.addEventListener("scroll", () => {
  if (!loading) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchNextBatchWithDelay();
    }
  }
});

let searchResults = [];
const searchInput = document.querySelector("#search-soldier");

async function fetchSearchResults(searchText) {
  const searchKeywords = searchText.split();
  const uniqueResults = new Set(); // 중복을 제거하기 위한 Set

  for (const keyword of searchKeywords) {
    try {
      const snapshot = await db
        .collection("user")
        .where("이름", ">=", keyword)
        .orderBy("이름")
        .startAt(keyword)
        .endAt(keyword + "\uf8ff")
        .get();

      snapshot.forEach((doc) => {
        uniqueResults.add(doc.data()); // 중복을 제거한 결과 추가
      });
    } catch (error) {
      console.error("Fetching Error: ", error);
    }
  }

  searchResults = Array.from(uniqueResults); // Set을 배열로 변환
  paintSoldierElement(searchResults); // 검색 결과 표시 함수 호출
}

searchInput.addEventListener("input", async (event) => {
  const searchText = event.target.value;

  if (searchText === "") {
    // 검색어가 비어있을 때 원본 데이터 표시
    paintSoldierElement(soldierDB);
    searchResults = []; // 검색 결과 배열 초기화
    return;
  }

  // 검색어가 있는 경우 검색 결과 가져오기
  fetchSearchResults(searchText);
});

const deleteButton = document.getElementById("delete-soldier");
let deleteMode = false;
const selectedIndexes = [];

const deleteModeButton = document.querySelectorAll(".delete-mode-buttons");
const selectedSoldiers = document.querySelectorAll(".selected");
const deleteCancelButtons = document.querySelectorAll(".delete-cancel");

function toggleDeleteMode() {
  const soldierDivs = document.querySelectorAll(".soldier");
  soldierDivs.forEach((div) => {
    div.classList.toggle("deletemode");
  });
}

const handleDeleteModeOff = () => {
  deleteMode = false;
  toggleDeleteMode();
  selectedIndexes.length = 0;
  deleteModeButton.forEach((item) => {
    item.classList.add("hidden");
  });
  deleteButton.className = "delete-off";
  deleteButton.innerText = "장병 삭제";
  deleteButton.id = "delete-soldier";
  const selectedSoldiers = document.querySelectorAll(".selected");
  selectedSoldiers.forEach((soldier) => {
    soldier.classList.remove("selected");
  });
};

const handleDeleteModeOn = () => {
  deleteMode = true;
  toggleDeleteMode();
  deleteButton.innerHTML = "삭제";
  deleteButton.className = "delete-on";
  deleteButton.id = "delete-confirm";
  deleteModeButton.forEach((item) => {
    item.classList.remove("hidden");
  });
};

const handleDeleteSoldiers = () => {
  // 선택된 장병 공석으로 변경
  selectedIndexes.sort((a, b) => b - a);
  selectedIndexes.forEach((index) => {
    const nullData = {
      이름: "",
      생년월일: "",
      사진: "",
    };
    db.collection("user").doc(`${index}`).update(nullData);
  });
  // 선택 해제
  selectedIndexes.length = 0;
  const selectedSoldiers = document.querySelectorAll(".selected");
  selectedSoldiers.forEach((soldier) => {
    soldier.classList.remove("selected");
  });
  // 장병 목록 다시 그리기
  container.innerHTML = "";
  setTimeout(() => {
    alert("삭제하시겠습니까?");
    location.reload();
  }, 500);
  fetchDataAndPaint();
};

deleteButton.addEventListener("click", () => {
  if (deleteMode) {
    handleDeleteSoldiers();
    handleDeleteModeOff();
  } else {
    handleDeleteModeOn();
  }
});

deleteCancelButtons.forEach((item) => {
  item.addEventListener("click", () => {
    handleDeleteModeOff();
  });
});

const deleteConfirmButtons = document.querySelectorAll("#delete-confirm");
deleteConfirmButtons.forEach((item) => {
  item.addEventListener("click", () => {
    handleDeleteSoldiers();
    handleDeleteModeOff();
  });
});

// 수정
function openEditModal(사진, 이름, 부서, 직급, 생년월일, 인덱스) {
  const modalDiv = document.querySelector("#edit-modal");
  modalDiv.querySelector(".modal").id = 인덱스;
  modalDiv.querySelector("img").src = 사진;
  modalDiv.querySelector("#이름").value = 이름;
  modalDiv.querySelector("#부서").value = 부서;
  modalDiv.querySelector("#직급").value = 직급;
  modalDiv.querySelector("#생년월일").value = 생년월일;
  modalDiv.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

const editModal = document.querySelector("#edit-modal");
const editModalBg = editModal.querySelector(".modal-background");
const editConfirmButton = editModal.querySelector("#confirm-modal-button");
const editCancelButton = editModal.querySelector("#close-modal-button");
const editPreviewImage = editModal.querySelector("#preview-image");

const handleEditModalClose = () => {
  document.body.style.overflow = "";
  editModal.classList.add("hidden");
  editModal.querySelector(".modal").removeAttribute("id");
};

editModalBg.addEventListener("click", handleEditModalClose);
editCancelButton.addEventListener("click", handleEditModalClose);

function handleFileUpload(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    editPreviewImage.style.display = "block";
    const reader = new FileReader();
    reader.onload = function (event) {
      editPreviewImage.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  } else {
    editPreviewImage.style.display = "none";
    editPreviewImage.src = "";
  }
}

const editmodalInputPhoto = editModal.querySelector(".modal-input-photo");
editmodalInputPhoto.addEventListener("click", () => {
  const fileInput = editModal.querySelector("#modal-photo-button");
  fileInput.click();
});

const editFileInput = editModal.querySelector("#modal-photo-button");
editFileInput.addEventListener("change", handleFileUpload);

editConfirmButton.addEventListener("click", () => {
  editDocument();
});

async function editDocument() {
  try {
    let imgUrl = "";
    let file = editModal.querySelector("#modal-photo-button").files[0]; // 선택된 파일 가져오기

    if (file) {
      let storageRef = storage.ref();
      let path = storageRef.child("image/" + file.name);
      await path.put(file);
      imgUrl = await path.getDownloadURL();
    } else {
      imgUrl = editModal.querySelector("#preview-image").src;
    }

    let 이름 = editModal.querySelector("#이름");
    let 부서 = editModal.querySelector("#부서");
    let 직급 = editModal.querySelector("#직급");
    let 생년월일 = editModal.querySelector("#생년월일");

    const docRef = db
      .collection("user")
      .doc(editModal.querySelector(".modal").id);
    const docSnapshot = await docRef.get();
    const timestampValue = docSnapshot.get("timestamp");

    let registerInfo = {
      timestamp: timestampValue,
      이름: 이름.value,
      부서: 부서.value,
      직급: 직급.value,
      생년월일: 생년월일.value,
      사진: imgUrl,
    };

    await db
      .collection("user")
      .doc(editModal.querySelector(".modal").id)
      .set(registerInfo);

    setTimeout(() => {
      editModal.querySelector(".modal").removeAttribute("id");
      alert("수정하시겠습니까?");
      location.reload();
    }, 500);
  } catch (error) {
    console.error("Error editing document:", error);
  }
}
