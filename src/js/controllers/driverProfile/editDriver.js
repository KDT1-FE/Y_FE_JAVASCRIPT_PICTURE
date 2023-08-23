import setBasicImg from "./setBasicImg.js";
import postEditDriver from "./postEditDriver.js";
// 사진 미리보기
import previewDriverImg from "../addDriver/previewDriverImg";

const editDriverBtn = document.getElementById("editDriverBtn");

editDriverBtn.addEventListener("click", editDriver);

function editDriver() {
  // main 컨테이너에 새로 생성한 요소 추가
  const driverProfile = document.getElementById("driverProfile");

  // 보험자 이름 input readonly 제거
  const driverNameInput = document.querySelector("#driverName input");

  driverNameInput.removeAttribute("readonly");
  driverNameInput.setAttribute(
    "style",
    "margin: 3px 0; border-bottom: .8px solid gray; width: 15rem"
  );

  // 새로운 이미지 file Input 생성
  const newImgInput = document.createElement("input");
  newImgInput.id = "newDriverImgInput";
  newImgInput.setAttribute("type", "file");
  newImgInput.setAttribute("accept", "image/jpg, image/png, image/gif");
  newImgInput.setAttribute("required", "");

  driverProfile.prepend(newImgInput);
  // 사진 미리보기
  previewDriverImg("newDriverImgInput", "driverImg");

  // 새로운 이미지 삭제 button 생성
  const setBasicImgBtn = document.createElement("button");
  setBasicImgBtn.id = "setBasicImgBtn";
  setBasicImgBtn.textContent = "이미지 삭제";

  driverProfile.prepend(setBasicImgBtn);

  setBasicImgBtn.addEventListener("click", setBasicImg);

  // 기존 수정 및 삭제 버튼 display: none
  editDriverBtn.style.display = "none";

  // 새로운 수정 완료하기 버튼 생성
  const postEditDriverBtn = document.createElement("button");
  postEditDriverBtn.id = "postEditDriverBtn";
  postEditDriverBtn.textContent = "수정 완료";
  postEditDriverBtn.setAttribute(
    "style",
    "margin-top: 20px; padding: 15px; border: 1px solid white;"
  );

  driverProfile.append(postEditDriverBtn);

  postEditDriverBtn.addEventListener("click", postEditDriver);
}
