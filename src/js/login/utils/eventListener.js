import { adminLoginCheck } from "../modules/checkLogin.js";

// login 확인 이벤트
const adminLoginForm = document.getElementById("adminLoginForm");
adminLoginForm.addEventListener("submit", adminLoginCheck);
