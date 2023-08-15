import { routes } from '../routes';

export function routeRender() {
  const routerView = document.querySelector('router-view');
  let { pathname } = window.location;
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(pathname)
  );
  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);
  window.scrollTo(0, 0);
}

export const getUrlParam = (params) => {
  return new URL(location.href).searchParams.get(params);
};

export const navigate = (url = '/') => {
  window.history.pushState(null, null, url);
  routeRender();
};
