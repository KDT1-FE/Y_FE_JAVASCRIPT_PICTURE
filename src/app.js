import { BASE_URL } from "./constants/routeInfo.js";
import navigate from "./utils/navigate.js";
import Router from "./router.js";

// container를 받아 클릭 이벤트를 정의하고
function App(container) {
  this.container = container;

  const init = () => {
    // 클릭 이벤트 발생 시 a 태그의 페이지 새로고침 차단하고
    // naviagte 함수 실행
    document.querySelector(".main").addEventListener("click", e => {
      const target = e.target.closest("a");
      // anchor 태그인지 확인
      if (!(target instanceof HTMLAnchorElement)) return;

      // 새로고침하는 기존 기능 차단
      e.preventDefault();
      const targetURL = target.href.replace(BASE_URL, "");
      navigate(targetURL);
    });

    new Router(container);
  };

  init();
}

export default App;
