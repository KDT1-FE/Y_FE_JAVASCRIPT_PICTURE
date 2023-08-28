export function adminLoginCheck(event) {
  const adminIDInput = document.getElementById("adminIDInput");
  const adminPWInput = document.getElementById("adminPWInput");
  const adminLoginCheck = document.getElementById("adminLoginCheck");

  if (adminIDInput.value !== process.env.ADMIN_ID) {
    event.preventDefault();
    adminLoginCheck.innerHTML = "관리자 아이디가 일치하지 않습니다.";
  } else if (adminPWInput.value !== process.env.ADMIN_PW) {
    event.preventDefault();
    adminLoginCheck.innerHTML = "관리자 비밀번호가 일치하지 않습니다.";
  } else {
    adminLoginForm.setAttribute("action", "./src/pages/main.html");
  }
}
