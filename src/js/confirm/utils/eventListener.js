import { fadeOutLoadPage } from "../../shared/load.js";
import { goToBack } from "../../shared/goToBack.js";
import { updateDriverConfirm } from "../modules/updateDriverConfirm.js";

// 로딩 이벤트
window.addEventListener("load", fadeOutLoadPage);

// 뒤로 가기 이벤트
const backBtn = document.querySelector("#back button");
backBtn
  ? backBtn.addEventListener("click", goToBack)
  : console.log("404 페이지로");

// 보험금 지급 이벤트
const confirmBtn = document.querySelector(".confirmBtn");
confirmBtn.addEventListener("click", updateDriverConfirm);
