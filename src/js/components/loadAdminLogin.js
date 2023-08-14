const loadAdminLogin = document.querySelector("#loadAdminLogin");

window.addEventListener("load", fadeOut);

function fadeOut() {
  try {
    setTimeout(() => {
      if (!loadAdminLogin.getAttribute("class", "fadeOut")) {
        loadAdminLogin.style.animation = "fadeOut .6s ease-in-out forwards";
      }
    }, 3000);
  } catch (error) {
    // 재접속 요청 화면
  }
}
