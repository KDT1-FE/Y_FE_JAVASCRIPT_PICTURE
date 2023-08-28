document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
  }, 1000);

  const loadingScreen = document.querySelector('.loading-screen');

  // 투명도 변화 이벤트 감지
  loadingScreen.addEventListener(
    'transitionend',
    (handleTransitionEnd = () => {
      document.documentElement.style.setProperty("--display", "none");
    })
  );
});
