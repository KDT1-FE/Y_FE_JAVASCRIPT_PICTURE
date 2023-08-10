import Edit from './Edit';
import Home from './Home';
import Member from './Member';
import Write from './Write';
export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/member',
    component: Member,
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
