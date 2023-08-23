import deleteDriverImg from "../driverProfile/deleteDriverImg.js";
import addDriverImg from "../addDriver/addDriverImg.js";
import updateDriverName from "./updateDriverName.js";

export default function postEditDriver() {
  const postEditDriverBtn = document.querySelector("#postEditDriverBtn");
  // 더블 클릭으로 인한 중복 수정 방지
  postEditDriverBtn.setAttribute("disabled", true);

  // 보험자 id, 새로운 보험자 이미지, redirection url 가져오기
  const driverId = document.location.href.split("?")[1];
  const newDriverImgInput = document.querySelector("#newDriverImgInput");
  const newDriverImg = newDriverImgInput.files[0];
  const redirectUrl = `./driverProfile.html?${driverId}`;

  // storage에 새로운 보험자 이미지 등록 및 업데이트
  addDriverImg(driverId, newDriverImg, redirectUrl);

  // 기존 보험자 이미지 가져오기
  const driverImg = document.querySelector("#driverImg");
  const oldDriverImgUrl = driverImg.src;
  const basicUserImgUrl =
    "https://firebasestorage.googleapis.com/v0/b/zero-car.appspot.com/o/basicImgs%2FbasicUserImg.png?alt=media&token=094111ba-a4f7-4619-9a35-d2f878921b45";

  // 새로운 이미지가 있으면서,
  // 새로운 이미지가 기본 사진이 아닐 때만 storage 사진 삭제
  if (newDriverImg) {
    if (oldDriverImgUrl !== basicUserImgUrl) {
      // storage에 기존 보험자 이미지 삭제
      deleteDriverImg(oldDriverImgUrl);
    }
  } else {
    setTimeout(() => {
      location.href = redirectUrl;
    }, 1000);
  }

  // 기존 보험자 이름 가져오기
  const driverNameInput = document.querySelector("#driverName input");
  const driverName = driverNameInput.value;
  console.log(driverName);
  // 기존 보험자 이름 업로드
  updateDriverName(driverId, driverName);
}
