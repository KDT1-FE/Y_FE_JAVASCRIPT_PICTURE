export function fadeOutLoadPage() {
  try {
    const loadPage = document.getElementById("load");

    setTimeout(() => {
      loadPage
        ? (loadPage.style.animation = "fadeOut .6s ease-in-out forwards")
        : console.log("404 페이지로");
    }, 2000);
  } catch (error) {
    // 재접속 요청 화면
  }
}
