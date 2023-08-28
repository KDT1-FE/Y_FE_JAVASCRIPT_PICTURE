import App from './App';
import { routeRender } from './core/router';

const root = document.querySelector('#root');
root.append(new App().componentRoot);
routeRender();
window.addEventListener('popstate', () => {
  routeRender();
});
