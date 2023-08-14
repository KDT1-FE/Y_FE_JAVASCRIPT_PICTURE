const adminLoginForm = document.querySelector("#adminLoginForm");
const adminIDInput = document.querySelector("#adminIDInput");
const adminPWInput = document.querySelector("#adminPWInput");

adminLoginForm.addEventListener("submit", adminLoginCheck);

function adminLoginCheck(event) {
  if (adminIDInput.value !== process.env.ADMIN_ID) {
    event.preventDefault();
    document.querySelector("#adminLoginCheck").innerHTML =
      "관리자 아이디가 일치하지 않습니다.";
  } else if (adminPWInput.value !== process.env.ADMIN_PW) {
    event.preventDefault();
    document.querySelector("#adminLoginCheck").innerHTML =
      "관리자 비밀번호가 일치하지 않습니다.";
  } else {
    adminLoginForm.setAttribute("method", "get");
    adminLoginForm.setAttribute("action", process.env.DRIVERLIST_URL);
  }
}
