window.onload = function () {
    const loadingScreen = document.querySelector(".loading-screen");
    
    // 로딩이 완료되면 로딩 화면을 천천히 사라지게 함
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500); // 로딩 화면이 완전히 사라지도록 딜레이 설정
    }, 1000); // 로딩 화면이 보이는 시간
  };
  