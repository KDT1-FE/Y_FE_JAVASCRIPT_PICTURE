import { firestore, storage } from "../utils/db.js";
import {
  doc,
  getDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  ref,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

import {
  appReset,
  renderDetailDOM,
  renderDetailDOMById
} from "../utils/function.js";

async function Detail() {
  const path = window.location.pathname.replace("/detail/", "");
  const docRef = await doc(firestore, "employee", path);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  const divApp = appReset("app");

  const detailContainer = renderDetailDOM("div", "detail-container", divApp);

  const detailTitleContainer = renderDetailDOM(
    "div",
    "detail-title-container",
    detailContainer
  );

  const detailContentContainer = renderDetailDOM(
    "div",
    "detail-content-container",
    detailContainer
  );

  // detail 타이틀 및 텍스트 생성
  const detailTitleContainerTitle = renderDetailDOM(
    "h2",
    "detail-title__title",
    detailTitleContainer,
    `대한민국 선수 관리 DB`
  );

  const detailTitleContainerText = renderDetailDOM(
    "p",
    "detail-title__p",
    detailTitleContainer
  );

  // detail 페이지 - content
  const detailContentWrapper = renderDetailDOM(
    "div",
    "detail-content-wrapper",
    detailContentContainer
  );

  // detail 페이지 - content - title
  const detailContentTitleWrapper = renderDetailDOM(
    "div",
    "detail-content-title-wrapper",
    detailContentWrapper
  );

  const detailTitle = renderDetailDOM(
    "h3",
    "detail-content-title_title",
    detailContentTitleWrapper,
    "선수 등록"
  );

  const detailBtnWrapper = renderDetailDOM(
    "div",
    "detail-content-btn-wrapper",
    detailContentTitleWrapper
  );

  const detailEditBtn = renderDetailDOMById(
    "a",
    "edit",
    detailBtnWrapper,
    "수정하기"
  );
  detailEditBtn.href = `/edit/${path}`;

  const detailDeleteBtn = renderDetailDOMById(
    "button",
    "detail-delete",
    detailBtnWrapper,
    "삭제하기"
  );

  //detail 페이지 - content - input
  const detailContentInputwrapper = renderDetailDOM(
    "div",
    "detail-content-input-wrapper",
    detailContentWrapper
  );

  detailContentInputwrapper.innerHTML = `
      <div>
      <span>이름</span>
      <input type="text" name="name" id="name" value="${data.name}" disabled/>
      </div>
      <div>
      <span>팀명</span>
      <input type="text" name="team" id="team" value="${data.team}" disabled/>
            </div>
      <div>
      <span>포지션</span>
      <input type="text" name="team" id="position" value="${data.position}" disabled/>
      </div>
      <div>
      <span>사진</span>
      <input type="file" id="image" disabled/>
  `;

  // 페이지 설명에 선수 이름 삽입
  detailTitleContainerText.innerHTML = `${
    document.querySelector("#name").value
  } 선수 상세 페이지입니다.`;

  // detail 페이지 - img
  const detailContentImageWrapper = renderDetailDOM(
    "div",
    "detail-content-image-wrapper",
    detailContentContainer
  );

  detailContentImageWrapper.innerHTML = `
  <img id = "detail-myimg"src="${data.image}"/>
  `;

  document
    .querySelector("#detail-delete")
    .addEventListener("click", async () => {
      if (confirm("정말 이 선수를 삭제하시려는 겁니까?.. ㅠ")) {
        const storageRef = ref(storage, data.image);
        await deleteObject(storageRef);
        await deleteDoc(docRef)
          .then(() => {
            window.location.href = "/";
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
}

export default Detail;
