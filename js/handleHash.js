// 해시값 변화 감지
window.addEventListener("hashchange", handleHashChange);

// 초기 로딩 시 해시값에 따른 초기 상태 설정
handleHashChange();

function handleHashChange() {
  const hash = location.hash;

  // 모든 div를 숨기지 않고 보여지도록 설정
  /*const divs = document.querySelectorAll("div");
  divs.forEach(div => {
    if (div.id === hash.substring(1)) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });*/
}