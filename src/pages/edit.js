import { app } from "../utils/db.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

async function Edit() {
  const path = window.location.pathname.replace("/edit/", "");

  const db = getFirestore(app);
  const storage = getStorage(app);
  const docRef = await doc(db, "employee", path);
  const docSnap = await getDoc(docRef);
  var imageURL;

  const divApp = document.getElementById("app");
  divApp.innerHTML = "";

  const editContainer = document.createElement("div");
  editContainer.setAttribute("class", "edit-container");
  divApp.append(editContainer);

  const editTitleContainer = document.createElement("div");
  editTitleContainer.setAttribute("class", "edit-title-container");
  editContainer.append(editTitleContainer);

  const editContentContainer = document.createElement("div");
  editContentContainer.setAttribute("class", "edit-content-container");
  editContainer.append(editContentContainer);

  // edit 타이틀 및 텍스트 생성
  const editTitleContainerTitle = document.createElement("h2");
  editTitleContainerTitle.setAttribute("class", "edit-title__title");
  editTitleContainerTitle.innerHTML = `대한민국 선수 관리 DB`;
  editTitleContainer.append(editTitleContainerTitle);

  const editTitleContainerText = document.createElement("p");
  editTitleContainerText.setAttribute("class", "edit-title__p");
  editTitleContainer.append(editTitleContainerText);

  // edit 페이지 - content
  const editContentWrapper = document.createElement("div");
  editContentWrapper.setAttribute("class", "edit-content-wrapper");
  editContentContainer.append(editContentWrapper);

  // edit 페이지 - content - title
  const editContentTitleWrapper = document.createElement("div");
  editContentTitleWrapper.setAttribute("class", "edit-content-title-wrapper");
  editContentWrapper.append(editContentTitleWrapper);

  const editTitle = document.createElement("h3");
  editTitle.setAttribute("class", "edit-content-title_title");
  editTitle.innerHTML = "선수 등록";
  editContentTitleWrapper.append(editTitle);

  const editBtnWrapper = document.createElement("div");
  editBtnWrapper.setAttribute("class", "edit-content-btn-wrapper");
  editContentTitleWrapper.append(editBtnWrapper);

  const editEditBtn = document.createElement("a");
  editEditBtn.setAttribute("id", "edit");
  editEditBtn.href = `/edit/${path}`;
  editEditBtn.innerHTML = `수정완료`;
  editBtnWrapper.append(editEditBtn);

  //edit 페이지 - content - input
  const editContentInputwrapper = document.createElement("div");
  editContentInputwrapper.setAttribute("class", "edit-content-input-wrapper");
  editContentWrapper.append(editContentInputwrapper);

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
  const editContentImageWrapper = document.createElement("div");
  editContentImageWrapper.setAttribute("class", "edit-content-image-wrapper");
  editContentContainer.append(editContentImageWrapper);

  editContentImageWrapper.innerHTML = `
  <img id = "edit-myimg"src="${docSnap.data().image}"/>
  `;

  // option selected 설정
  const positionId = document.getElementById("position");

  for (let i = 0; i < positionId.options.length; i++) {
    if (positionId.options[i].value == docSnap.data().position) {
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
    if (!imageURL) imageURL = docSnap.data().image;

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
        setDoc(doc(db, "employee", path), {
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
