import Edit from './Edit';
import Home from './Home';
import Detail from './Detail';
import Write from './Write';
import NotFound from './NotFound';
export const routes = [
  {
    path: '#/',
    component: Home,
  },
  {
    path: '#/detail',
    component: Detail,
  },
  {
    path: '#/write',
    component: Write,
  },
  {
    path: '#/edit',
    component: Edit,
  },
  {
    path: '.*',
    component: NotFound,
  }, // 404 페이지
];
