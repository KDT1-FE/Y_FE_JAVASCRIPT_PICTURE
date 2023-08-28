import { firestore, storage } from "../utils/db.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  ref,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
  appReset,
  renderDetailDOM,
  renderDetailDOMById
} from "../utils/function.js";
async function Post() {
  let imageURL = "";

  const divApp = appReset("app");

  const postContainer = renderDetailDOM("div", "post-container", divApp);

  const postTitleContainer = renderDetailDOM(
    "div",
    "post-title-container",
    postContainer
  );

  const postContentContainer = renderDetailDOM(
    "div",
    "post-content-container",
    postContainer
  );

  // post 타이틀 및 텍스트 생성
  const postTitleContainerTitle = renderDetailDOM(
    "h2",
    "post-title__title",
    postTitleContainer,
    "대한민국 선수 관리 DB"
  );

  const postTitleContainerText = renderDetailDOM(
    "p",
    "post-title__p",
    postTitleContainer,
    "대한민국 선수 등록 페이지입니다."
  );

  // post 페이지 - content
  const postContentWrapper = renderDetailDOM(
    "div",
    "post-content-wrapper",
    postContentContainer
  );

  // post 페이지 - content - title
  const postContentTitlewrapper = renderDetailDOM(
    "div",
    "post-content-title-wrapper",
    postContentWrapper
  );

  const postTitle = renderDetailDOM(
    "h3",
    "post-content-title_title",
    postContentTitlewrapper,
    "선수 등록"
  );

  const postBtn = renderDetailDOMById(
    "button",
    "post",
    postContentTitlewrapper,
    "등록하기"
  );

  //post 페이지 - content - input
  const postContentInputwrapper = renderDetailDOM(
    "div",
    "post-content-input-wrapper",
    postContentWrapper
  );
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
  const postContentImageWrapper = renderDetailDOM(
    "div",
    "post-content-image-wrapper",
    postContentContainer
  );
  postContentImageWrapper.innerHTML = `
  <img id="myimg" src="https://firebasestorage.googleapis.com/v0/b/employeemanagement-9fd1f.appspot.com/o/images%2Fprofile.jpeg?alt=media&token=34d49c1a-07fd-41e7-bb1e-34348d18c23d"/>
  `;

  // 이미지 프리뷰
  document.querySelector("#image").addEventListener("change", async () => {
    const file = document.querySelector("#image").files[0];

    const storageRef = ref(storage, "images/" + file.name);

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

    // 빈 칸이 있는지 먼저 확인
    if (
      inputValue.name == "" ||
      inputValue.image == "" ||
      inputValue.position == "" ||
      inputValue.team == ""
    ) {
      alert("빈 칸 없이 똑바로 입력해주세요 !");
    } else {
      // 확인 알림
      if (confirm("정말 정말 등록합니다?")) {
        const add = addDoc(collection(firestore, "employee"), inputValue)
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

export default Post;
