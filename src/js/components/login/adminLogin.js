const adminLoginForm = document.getElementById("adminLoginForm");
const adminIDInput = document.getElementById("adminIDInput");
const adminPWInput = document.getElementById("adminPWInput");

adminLoginForm.addEventListener("submit", adminLoginCheck);

function adminLoginCheck(event) {
  if (adminIDInput.value !== process.env.ADMIN_ID) {
    event.preventDefault();
    document.getElementById("adminLoginCheck").innerHTML =
      "관리자 아이디가 일치하지 않습니다.";
  } else if (adminPWInput.value !== process.env.ADMIN_PW) {
    event.preventDefault();
    document.getElementById("adminLoginCheck").innerHTML =
      "관리자 비밀번호가 일치하지 않습니다.";
  } else {
    adminLoginForm.setAttribute("action", "./src/templates/driverList.html");
  }
}
