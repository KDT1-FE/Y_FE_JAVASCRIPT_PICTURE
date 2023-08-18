// 로딩 스크린을 사라지게 하는 함수
function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    const content = document.getElementById("content");
    
    loadingScreen.style.display = "none";
    content.style.display = "block";
  }
  
  // 페이지 로딩이 완료되면 로딩 스크린을 숨기는 함수 호출
  window.addEventListener("load", hideLoadingScreen);
  
  // 로딩 화면이 완전히 로딩된 후 index.html로 리다이렉트
window.addEventListener("load", function() {
    setTimeout(function() {
      window.location.href = "emp-list-page.html"; // 리다이렉트할 페이지의 URL
    }, 3000); // 로딩 화면을 보여주는 시간 (여기서는 3초)
  });