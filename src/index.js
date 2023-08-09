import App from './App';
import { routeRender } from './core/router';

const root = document.querySelector('#root');
root.append(new App().el);
routeRender();
window.addEventListener('popstate', () => {
  routeRender();
});
