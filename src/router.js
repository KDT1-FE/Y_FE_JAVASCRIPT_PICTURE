import { routes } from "./constants/routeInfo.js";
import NotFound from "./pages/notfound.js";

function Router(container) {
  this.container = container;

  //routes 객체에서 정규표현식을 활용하여 원하는 요소 찾기
  const findMatchedRoute = () =>
    routes.find(route => route.path.test(location.pathname));

  // 찾은 요소에서 container에 element 출력
  const route = () => {
    findMatchedRoute().element();
  };

  const init = () => {
    // historychange 이벤트 발생 시( 페이지 이동 시 )
    window.addEventListener("historychange", ({ detail }) => {
      const { to, isReplace } = detail;
      // 새로고침 되거나 동일한 페이지 접속 시 history에 스택x
      if (isReplace || to === location.pathname)
        history.replaceState(null, "", to);
      // 새로운 페이지 접속 시 history 스택에 푸쉬
      else history.pushState(null, "", to);

      route();
    });

    // 백 버튼을 누르면 발생하는 이벤트
    window.addEventListener("popstate", () => {
      route();
    });
  };

  init();
  route();
}

export default Router;
