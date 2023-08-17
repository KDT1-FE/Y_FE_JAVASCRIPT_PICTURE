import { app } from "../utils/db.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

async function Post() {
  const db = getFirestore(app);
  const storage = getStorage(app);
  let imageURL = "";

  const divApp = document.getElementById("app");
  divApp.innerHTML = "";

  const postContainer = document.createElement("div");
  postContainer.setAttribute("class", "post-container");
  divApp.append(postContainer);

  const postTitleContainer = document.createElement("div");
  postTitleContainer.setAttribute("class", "post-title-container");
  postContainer.append(postTitleContainer);

  const postContentContainer = document.createElement("div");
  postContentContainer.setAttribute("class", "post-content-container");
  postContainer.append(postContentContainer);

  // post 타이틀 및 텍스트 생성
  const postTitleContainerTitle = document.createElement("h2");
  postTitleContainerTitle.setAttribute("class", "post-title__title");
  postTitleContainerTitle.innerHTML = `대한민국 선수 관리 DB`;
  postTitleContainer.append(postTitleContainerTitle);

  const postTitleContainerText = document.createElement("p");
  postTitleContainerText.setAttribute("class", "post-title__p");
  postTitleContainerText.innerHTML = `대한민국 선수 등록 페이지입니다.`;
  postTitleContainer.append(postTitleContainerText);

  // post 페이지 - content
  const postContentWrapper = document.createElement("div");
  postContentWrapper.setAttribute("class", "post-content-wrapper");
  postContentContainer.append(postContentWrapper);

  // post 페이지 - content - title
  const postContentTitlewrapper = document.createElement("div");
  postContentTitlewrapper.setAttribute("class", "post-content-title-wrapper");
  postContentWrapper.append(postContentTitlewrapper);

  const postTitle = document.createElement("h3");
  postTitle.setAttribute("class", "post-content-title_title");
  postTitle.innerHTML = "선수 등록";
  postContentTitlewrapper.append(postTitle);

  const postBtn = document.createElement("button");
  postBtn.setAttribute("id", "post");
  postBtn.innerHTML = `등록하기`;
  postContentTitlewrapper.append(postBtn);

  //post 페이지 - content - input
  const postContentInputwrapper = document.createElement("div");
  postContentInputwrapper.setAttribute("class", "post-content-input-wrapper");
  postContentWrapper.append(postContentInputwrapper);

  postContentInputwrapper.innerHTML = `
      <div>
      <span>이름</span>
      <input type="text" name="name" id="name" placeholder="이름" />
      </div>
      <div>
      <span>팀명</span>
      <input type="text" name="team" id="team" Placeholder="팀명" />
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
      </div>
  `;

  // post 페이지 - img
  const postContentImageWrapper = document.createElement("div");
  postContentImageWrapper.setAttribute("class", "post-content-image-wrapper");
  postContentContainer.append(postContentImageWrapper);

  postContentImageWrapper.innerHTML = `
  <img id="myimg" src="https://firebasestorage.googleapis.com/v0/b/employeemanagement-9fd1f.appspot.com/o/images%2Fprofile.jpeg?alt=media&token=34d49c1a-07fd-41e7-bb1e-34348d18c23d"/>
  `;

  // 이미지 프리뷰
  document.querySelector("#image").addEventListener("change", async () => {
    const file = document.querySelector("#image").files[0];

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = await uploadBytes(storageRef, file);

    await getDownloadURL(storageRef)
      .then(url => {
        document.querySelector("#myimg").src = url;
        imageURL = url;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // 데이터 삽입
  document.querySelector("#post").addEventListener("click", async () => {
    const inputValue = {
      image: imageURL,
      name: document.querySelector("#name").value.toUpperCase(),
      position: document.querySelector("#position").value.toUpperCase(),
      team: document.querySelector("#team").value.toUpperCase()
    };

    const add = addDoc(collection(db, "employee"), inputValue)
      .then(() => {
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err);
      });
  });
}

export default Post;
