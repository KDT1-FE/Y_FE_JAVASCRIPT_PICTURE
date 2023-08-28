import { firestore, storage } from "../utils/db.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
  appReset,
  renderDetailDOM,
  renderDetailDOMById
} from "../utils/function.js";

async function Edit() {
  const path = window.location.pathname.replace("/edit/", "");

  const docRef = await doc(firestore, "employee", path);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  var imageURL;

  const divApp = appReset("app");

  const editContainer = renderDetailDOM("div", "edit-container", divApp);

  const editTitleContainer = renderDetailDOM(
    "div",
    "edit-title-container",
    editContainer
  );

  const editContentContainer = renderDetailDOM(
    "div",
    "edit-content-container",
    editContainer
  );

  // edit 타이틀 및 텍스트 생성
  const editTitleContainerTitle = renderDetailDOM(
    "h2",
    "edit-title__title",
    editTitleContainer,
    "대한민국 선수 관리 DB"
  );

  const editTitleContainerText = renderDetailDOM(
    "p",
    "edit-title__p",
    editTitleContainer
  );

  // edit 페이지 - content
  const editContentWrapper = renderDetailDOM(
    "div",
    "edit-content-wrapper",
    editContentContainer
  );

  // edit 페이지 - content - title
  const editContentTitleWrapper = renderDetailDOM(
    "div",
    "edit-content-title-wrapper",
    editContentWrapper
  );

  const editTitle = renderDetailDOM(
    "h3",
    "edit-content-title__title",
    editContentTitleWrapper,
    "선수 등록"
  );

  const editBtnWrapper = renderDetailDOM(
    "div",
    "edit-content-btn-wrapper",
    editContentTitleWrapper
  );

  const editEditBtn = renderDetailDOMById(
    "a",
    "edit",
    editBtnWrapper,
    "수정완료"
  );
  editEditBtn.href = `/edit/${path}`;

  //edit 페이지 - content - input
  const editContentInputwrapper = renderDetailDOM(
    "div",
    "edit-content-input-wrapper",
    editContentWrapper
  );

  editContentInputwrapper.innerHTML = `
      <div>
      <span>이름</span>
      <input type="text" name="name" id="name" value="${docSnap.data().name}"/>
      </div>
      <div>
      <span>팀명</span>
      <input type="text" name="team" id="team" value="${docSnap.data().team}"/>
            </div>
      <div>
      <span>포지션</span>
      <select name="position" id="position">
        <option value="FW">FW</option>
        <option value="MF">MF</option>
        <option value="DF">DF</option>
        <option value="GK">GK</option>
      </select>
      </div>
      <div>
      <span>사진</span>
      <input type="file" id="image"/>
  `;

  // 페이지 설명에 선수 이름 삽입
  editTitleContainerText.innerHTML = `${
    document.querySelector("#name").value
  } 선수 데이터 수정 페이지입니다.`;

  // edit 페이지 - img
  const editContentImageWrapper = renderDetailDOM(
    "div",
    "edit-content-image-wrapper",
    editContentContainer
  );

  editContentImageWrapper.innerHTML = `
  <img id = "edit-myimg"src="${data.image}"/>
  `;

  // option selected 설정
  const positionId = document.getElementById("position");

  for (let i = 0; i < positionId.options.length; i++) {
    if (positionId.options[i].value == data.position) {
      positionId.options[i].selected = true;
    }
  }

  // 프리뷰 구현
  document.querySelector("#image").addEventListener("change", async () => {
    const file = document.querySelector("#image").files[0];

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = await uploadBytes(storageRef, file);

    await getDownloadURL(storageRef)
      .then(url => {
        document.querySelector("#edit-myimg").src = url;
        imageURL = url;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // 데이터 수정
  document.getElementById("edit").addEventListener("click", e => {
    // 이미지 수정 시 imageURL 변경
    if (!imageURL) imageURL = data.image;

    // 빈 칸 확인
    if (
      document.querySelector("#name").value.toUpperCase() == "" ||
      document.querySelector("#position").value.toUpperCase() == "" ||
      document.querySelector("#team").value.toUpperCase() == ""
    ) {
      alert("빈 칸 없이 똑바로 입력해주세요 !");
    } else {
      // 확인 알림
      if (confirm("정말 이렇게 수정합니다?")) {
        setDoc(doc(firestore, "employee", path), {
          image: imageURL,
          name: document.querySelector("#name").value.toUpperCase(),
          position: document.querySelector("#position").value.toUpperCase(),
          team: document.querySelector("#team").value.toUpperCase()
        })
          .then(() => {
            window.location.href = "/";
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  });
}

export default Edit;
