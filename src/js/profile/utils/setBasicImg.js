import { updateDriverImg } from "../../shared/firebase/update/updateDriverImg.js";

// 기존 이미지 일반 사진으로 변경
export function setBasicImg() {
  const driverImg = document.getElementById("driverImg");
  const oldDriverImg = driverImg.src;
  const basicUserImgUrl =
    "https://firebasestorage.googleapis.com/v0/b/zero-car.appspot.com/o/basicImgs%2Fbasic%20user.png?alt=media&token=aaa54234-fadc-401e-875d-d7a892fd27b7";
  const driverId = document.location.href.split("?")[1];

  // 기존 사진이 기본 사진이 아닐 때만 driver doc 업데이트
  if (oldDriverImg !== basicUserImgUrl) {
    updateDriverImg(driverId, basicUserImgUrl);
    driverImg.src = basicUserImgUrl;
  }
}
