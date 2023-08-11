document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login_form form");
  const emailInput = document.getElementById("logemail");
  const passwordInput = document.getElementById("logpass");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === "1234@naver.com" && password === "1234") {
      alert("로그인 성공!");
      location.href = "./logout.html";
    } else {
      alert("로그인 실패. 이메일과 비밀번호를 확인해주세요.");
    }
  });
});
