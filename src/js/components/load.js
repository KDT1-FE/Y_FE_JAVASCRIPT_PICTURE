const loadPage = document.getElementById("load");

window.addEventListener("load", fadeOutLoadPage);

// DOM, CSSOM 및 데이터 등 모두 load 후 2초 뒤로딩 페이지 fadeout
function fadeOutLoadPage() {
  try {
    setTimeout(() => {
      loadPage.style.animation = "fadeOut .6s ease-in-out forwards";
    }, 2000);
  } catch (error) {
    // 재접속 요청 화면
  }
}
