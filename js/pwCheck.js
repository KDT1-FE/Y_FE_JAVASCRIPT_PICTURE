const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");

// 유효성 검사 기능 추가
loginButton.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password === "1234") {
    // 로그인 성공 시 직원 관리페이지로 이동
    window.location.href = "myAlba.html";
  } else if (password === "") {
    // 비밀번호 오류 메세지 1 (입력된 값이 없을때)
    errorMessage.textContent = "비밀번호를 입력해주세요!";
    errorMessage.style.display = "block";
  } else {
    // 비밀번호 오류 메세지 2 (비밀번호가 틀렸을때)
    errorMessage.textContent = "비밀번호를 다시 확인해주세요!";
    errorMessage.style.display = "block";
  }
});
