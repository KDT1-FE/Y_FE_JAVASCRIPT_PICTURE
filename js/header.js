// 스크롤하면 헤더에 그림자 추가
window.addEventListener("scroll", function () {
  const headerContainer = document.querySelector(".header-container");
  if (window.scrollY !== 0) {
    headerContainer.classList.add("shadow");
  } else {
    headerContainer.classList.remove("shadow");
  }
});
