import { createRouter } from '../core/index.js';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

export default createRouter([
    { path: '#/', component: Home },
    { path: '#/about', component: About },
    { path: '.*', component: NotFound },
]);
