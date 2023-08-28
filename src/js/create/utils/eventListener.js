import { goToBack } from "../../shared/goToBack.js";
import { previewImg } from "../../shared/previewImg.js";
import { createDriverData } from "../modules/createDriverData.js";

// 뒤로 가기 이벤트
const backBtn = document.querySelector("#back button");
backBtn
  ? backBtn.addEventListener("click", goToBack)
  : console.log("404 페이지로");

// 사진 미리보기 이벤트
const driverImgInput = document.getElementById("driverImg");
driverImgInput.addEventListener("change", previewImg);

// 보험자 추가 이벤트
const addDriverForm = document.getElementById("addDriver");
addDriverForm
  ? addDriverForm.addEventListener("submit", createDriverData)
  : console.log("404 페이지로");
