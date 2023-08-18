/* header.js */

//모바일 반응형 웹 토글 버튼
const toggleBtn = document.querySelector(".icon");
const menu = document.querySelector(".menu ul");

// toggleBtn icon이 클릭 됐을 때 메뉴창 드롭 다운
toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});
