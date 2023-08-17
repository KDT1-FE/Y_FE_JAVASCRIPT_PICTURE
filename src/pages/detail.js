import { app } from "../utils/db.js";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

async function Detail() {
  const path = window.location.pathname.replace("/detail/", "");

  const db = getFirestore(app);
  const storage = getStorage(app);
  const docRef = await doc(db, "employee", path);
  const docSnap = await getDoc(docRef);

  const divApp = document.getElementById("app");
  divApp.innerHTML = "";

  const detailContainer = document.createElement("div");
  detailContainer.setAttribute("class", "detail-container");
  divApp.append(detailContainer);

  const detailTitleContainer = document.createElement("div");
  detailTitleContainer.setAttribute("class", "detail-title-container");
  detailContainer.append(detailTitleContainer);

  const detailContentContainer = document.createElement("div");
  detailContentContainer.setAttribute("class", "detail-content-container");
  detailContainer.append(detailContentContainer);

  // detail 타이틀 및 텍스트 생성
  const detailTitleContainerTitle = document.createElement("h2");
  detailTitleContainerTitle.setAttribute("class", "detail-title__title");
  detailTitleContainerTitle.innerHTML = `대한민국 선수 관리 DB`;
  detailTitleContainer.append(detailTitleContainerTitle);

  const detailTitleContainerText = document.createElement("p");
  detailTitleContainerText.setAttribute("class", "detail-title__p");
  detailTitleContainerText.innerHTML = `대한민국 선수 상세 페이지입니다.`;
  detailTitleContainer.append(detailTitleContainerText);

  // detail 페이지 - content
  const detailContentWrapper = document.createElement("div");
  detailContentWrapper.setAttribute("class", "detail-content-wrapper");
  detailContentContainer.append(detailContentWrapper);

  // detail 페이지 - content - title
  const detailContentTitleWrapper = document.createElement("div");
  detailContentTitleWrapper.setAttribute(
    "class",
    "detail-content-title-wrapper"
  );
  detailContentWrapper.append(detailContentTitleWrapper);

  const detailTitle = document.createElement("h3");
  detailTitle.setAttribute("class", "detail-content-title_title");
  detailTitle.innerHTML = "선수 등록";
  detailContentTitleWrapper.append(detailTitle);

  const detailBtnWrapper = document.createElement("div");
  detailBtnWrapper.setAttribute("class", "detail-content-btn-wrapper");
  detailContentTitleWrapper.append(detailBtnWrapper);

  const detailEditBtn = document.createElement("a");
  detailEditBtn.setAttribute("id", "edit");
  detailEditBtn.href = `/edit/${path}`;
  detailEditBtn.innerHTML = `수정하기`;
  detailBtnWrapper.append(detailEditBtn);

  const detailDeletBtn = document.createElement("button");
  detailDeletBtn.setAttribute("id", "detail-delete");
  detailDeletBtn.innerHTML = "삭제하기";
  detailBtnWrapper.append(detailDeletBtn);

  //detail 페이지 - content - input
  const detailContentInputwrapper = document.createElement("div");
  detailContentInputwrapper.setAttribute(
    "class",
    "detail-content-input-wrapper"
  );
  detailContentWrapper.append(detailContentInputwrapper);

  detailContentInputwrapper.innerHTML = `
      <div>
      <span>이름</span>
      <input type="text" name="name" id="name" value="${
        docSnap.data().name
      }" disabled/>
      </div>
      <div>
      <span>팀명</span>
      <input type="text" name="team" id="team" value="${
        docSnap.data().team
      }" disabled/>
            </div>
      <div>
      <span>포지션</span>
      <input type="text" name="team" id="position" value="${
        docSnap.data().position
      }" disabled/>
      </div>
      <div>
      <span>사진</span>
      <input type="file" id="image" disabled/>
  `;

  // detail 페이지 - img
  const detailContentImageWrapper = document.createElement("div");
  detailContentImageWrapper.setAttribute(
    "class",
    "detail-content-image-wrapper"
  );
  detailContentContainer.append(detailContentImageWrapper);

  detailContentImageWrapper.innerHTML = `
  <img id = "detail-myimg"src="${docSnap.data().image}"/>
  `;

  document
    .querySelector("#detail-delete")
    .addEventListener("click", async () => {
      const storageRef = ref(storage, docSnap.data().image);
      await deleteObject(storageRef);
      await deleteDoc(docRef)
        .then(() => {
          window.location.href = "/";
        })
        .catch(err => {
          console.log(err);
        });
    });
}

export default Detail;
