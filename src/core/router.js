import { routes } from '../routes';

export function routeRender() {
  const routerView = document.querySelector('router-view');
  let { pathname } = window.location;
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(pathname)
  );
  console.log(currentRoute, 'currentRoute');
  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);
  window.scrollTo(0, 0);
}

export const getUrlParam = () => {
  return window.location.pathname.split('/')[2];
};
