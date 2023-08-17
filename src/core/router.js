import { routes } from '../routes';

export function routeRender() {
  if (!location.hash) {
    history.replaceState(null, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString] = location.hash.split('?');
  const currentRoute = routes.find((route) => {
    console.log(route.path);
    return new RegExp(route.path + '/?$').test(hash);
  });
  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);
  window.scrollTo(0, 0);
}

export const getUrlParam = () => {
  const [hash, queryString] = location.hash.split('?');
  const [id, value] = queryString.split('=');
  return value;
};

export const navigate = (url = '/#/') => {
  window.history.pushState(null, null, url);
  routeRender();
};
