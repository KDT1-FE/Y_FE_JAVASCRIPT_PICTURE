// Component
export class Component {
  constructor(payload = {}) {
    const { tagName = "div" } = payload;
    this.el = document.createElement(tagName);
    this.render();
  }
  render() {}
}

// Router
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/login");
  }

  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");
  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}
