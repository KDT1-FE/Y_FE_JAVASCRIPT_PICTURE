import Edit from './Edit';
import Home from './Home';
import Detail from './Detail';
import Write from './Write';
export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/detail',
    component: Detail,
  },
  {
    path: '/write',
    component: Write,
  },
  {
    path: '/edit',
    component: Edit,
  },
];
