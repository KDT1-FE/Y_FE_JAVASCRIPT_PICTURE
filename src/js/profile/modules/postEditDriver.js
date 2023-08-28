import { deleteDriverImg } from "../../shared/firebase/delete/deleteDriverImg.js";
import { createDriverImg } from "../../shared/firebase/create/createDriverImg.js";
import { updateDriverName } from "./updateDriverName.js";

export function postEditDriver() {
  const postEditDriverBtn = document.getElementById("postEditDriverBtn");
  // 더블 클릭으로 인한 중복 수정 방지
  postEditDriverBtn.setAttribute("disabled", true);

  // 보험자 id, 새로운 보험자 이미지, redirection url 가져오기
  const driverId = document.location.href.split("?")[1];
  const driverImgInput = document.getElementById("driverImgInput");
  const newDriverImg = driverImgInput.files[0];
  const redirectUrl = `./profile.html?${driverId}`;

  // storage에 새로운 보험자 이미지 등록 및 업데이트
  createDriverImg(driverId, newDriverImg, redirectUrl);

  // 기존 보험자 이미지 가져오기
  const driverImg = document.getElementById("driverImg");
  const oldDriverImgUrl = driverImg.src;

  // 새로운 이미지로 변경 되었을 때만 storage 사진 삭제
  if (newDriverImg) {
    // storage에 기존 보험자 이미지 삭제
    deleteDriverImg(oldDriverImgUrl);
  } else {
    setTimeout(() => {
      location.href = redirectUrl;
    }, 1000);
  }

  // 기존 보험자 이름 가져오기
  const driverNameInput = document.querySelector("#driverName input");
  const driverName = driverNameInput.value;
  // 기존 보험자 이름 업로드
  updateDriverName(driverId, driverName);
}
