import { setBasicImg } from "../utils/setBasicImg.js";
import { postEditDriver } from "./postEditDriver.js";
import { previewImg } from "../../shared/previewImg.js";

export function editDriver() {
  const driverProfile = document.getElementById("driverProfile");

  const driverNameInput = document.querySelector("#driverName input");
  driverNameInput.removeAttribute("readonly");
  driverNameInput.setAttribute(
    "style",
    "margin: 3px 0; border-bottom: .8px solid gray; width: 15rem"
  );

  // 새로운 이미지 file Input 생성
  const newImgInput = document.createElement("input");
  newImgInput.id = "driverImgInput";
  newImgInput.setAttribute("type", "file");
  newImgInput.setAttribute("accept", "image/jpg, image/png, image/gif");
  newImgInput.setAttribute("required", "");

  driverProfile.prepend(newImgInput);

  // 사진 미리보기 이벤트
  const driverImgInput = document.getElementById("driverImgInput");
  driverImgInput
    ? driverImgInput.addEventListener("change", previewImg)
    : console.log("404 페이지로");

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
