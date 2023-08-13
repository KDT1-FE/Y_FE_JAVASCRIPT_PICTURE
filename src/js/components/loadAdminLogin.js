const loadAdminLogin = document.querySelector("#loadAdminLogin");

window.addEventListener("load", fadeOut(loadAdminLogin));

function fadeOut(element) {
  try {
    setTimeout(() => {
      if (!element.getAttribute("class", "fadeOut")) {
        element.style.animation = "fadeOut .6s ease-in-out forwards";
      }
    }, 3000);
  } catch (error) {
    // 재접속 요청 화면
  }
}
