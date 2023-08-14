/**
 * 컴포넌트를 생성하는 클래스
 * @param {*} payload tagName, state, props를 전달합니다.
 * @returns new 키워드를 사용해서 컴포넌트를 만들 수 있습니다.
 */
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {
    // Override
  }
}

function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/");
  }
  const routerView = document.querySelector("router-view");
  // 쿼리문이 있을수도 있어서 ?를 기준으로 split한다. 없을경우 빈문자를 할당한다.
  const [hash, queryString = ""] = location.hash.split("?");

  // a=123&b=456 처럼 전달되는 쿼리스트링을 처리
  const query = queryString.split("&").reduce((acc, cur) => {
    // a=123 처럼 키와 값으로 나눈다.
    const [key, value] = cur.split("=");

    // 배열의 길이만큼 반복해서 키와 값을 넣어준다.
    acc[key] = value;

    return acc;
  }, {});
  history.replaceState(query, "");

  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash),
  );
  if (routerView) {
    routerView.innerHTML = "";
    currentRoute && routerView.append(new currentRoute.component().el);
  }

  // 스크롤을 최상단으로 이동하기
  window.scrollTo(0, 0);
}
export function createRouter(routes) {
  return () => {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

/**
 * 스토어 기능을 담당하는 클래스
 * @param {*}
 * @returns
 */
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            // 호출할 콜백이 있는 경우!
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : (this.observers[key] = [cb]);
  }
}
