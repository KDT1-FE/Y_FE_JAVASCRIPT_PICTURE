import { fadeOutLoadPage } from "../../shared/load.js";
import { goToBack } from "../../shared/goToBack.js";
import { editDriver } from "../modules/editDriver.js";

// 로딩 이벤트
window.addEventListener("load", fadeOutLoadPage);

// 뒤로 가기 이벤트
const backBtn = document.querySelector("#back button");
backBtn
  ? backBtn.addEventListener("click", goToBack)
  : console.log("404 페이지로");

// 수정하기 클릭 이벤트
const editDriverBtn = document.getElementById("editDriverBtn");
editDriverBtn.addEventListener("click", editDriver);
