// 모든 페이지에서
// document 안의 이미지, js 파일 포함 전부 로드가 되었을 경우 로딩 페이지를 fadeout
const loadPage = document.getElementById("load");

window.addEventListener("load", fadeOutLoadPage);

// DOM, CSSOM 및 데이터 등 모두 load 후 2초 뒤로딩 페이지 fadeout
function fadeOutLoadPage() {
  try {
    setTimeout(() => {
      loadPage
        ? (loadPage.style.animation = "fadeOut .6s ease-in-out forwards")
        : console.log("404 페이지로");
    }, 2000);
  } catch (error) {
    // 재접속 요청 화면
  }
}
