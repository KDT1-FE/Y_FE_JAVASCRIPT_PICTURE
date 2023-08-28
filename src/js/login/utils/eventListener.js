import { fadeOutLoadPage } from "../../shared/load.js";
import { adminLoginCheck } from "../modules/checkLogin.js";

// 로딩 이벤트
window.addEventListener("load", fadeOutLoadPage);

// login 확인 이벤트
const adminLoginForm = document.getElementById("adminLoginForm");
adminLoginForm.addEventListener("submit", adminLoginCheck);
