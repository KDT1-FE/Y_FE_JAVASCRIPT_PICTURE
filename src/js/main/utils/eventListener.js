import { fadeOutLoadPage } from "../../shared/load.js";
import { searchDriver } from "../modules/searchDriver.js";
import { checkAndDeleteDriver } from "../modules/checkAndDeleteDriver.js";

// 로딩 이벤트
window.addEventListener("load", fadeOutLoadPage);

// 보험자 검색 이벤트
document.addEventListener("DOMContentLoaded", searchDriver);

// 보험자 삭제 이벤트
const deleteDriverBtn = document.getElementById("deleteDriver");
deleteDriverBtn
  ? deleteDriverBtn.addEventListener("click", checkAndDeleteDriver)
  : console.log("404 페이지로");

// crate page로 이동 이벤트
const addDriverAnc = document.querySelector("#addDriverAnc");
addDriverAnc
  ? addDriverAnc.addEventListener("click", () => {
      addDriverAnc.setAttribute("href", "./create.html");
    })
  : console.log("404 페이지로");
