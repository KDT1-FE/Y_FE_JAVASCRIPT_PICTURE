import deleteDriverImg from "./deleteDriverImg.js";
import updateDriverImg from "../addDriver/updateDriverImg.js";

// 기존 이미지 일반 사진으로 변경
export default function setBasicImg() {
  const driverImg = document.querySelector("#driverImg");
  const oldDriverImg = driverImg.src;
  const basicUserImgUrl =
    "https://firebasestorage.googleapis.com/v0/b/zero-car.appspot.com/o/basicImgs%2FbasicUserImg.png?alt=media&token=094111ba-a4f7-4619-9a35-d2f878921b45";
  const driverId = document.location.href.split("?")[1];

  if (oldDriverImg !== basicUserImgUrl) {
    console.log("기존 이미지가 기본 사진이 아닐 때");
    //console.log(oldDriverImg);
    // deleteDriverImg(oldDriverImg);
    updateDriverImg(driverId, basicUserImgUrl);
    driverImg.src = basicUserImgUrl;
  }
}
