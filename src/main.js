import Footer from './components/Footer.js';
import Header from './components/Header.js';
import CardList from './components/CardList.js';
import Category from './components/Category.js';
import { setData } from './firebase/data.js';

const root = document.querySelector('#root');
document.documentElement.setAttribute('color-theme', 'light');

const initData = [];
await setData().then((res) => {
  res.forEach((el) => initData.push(el));
});
export const cardList = new CardList(initData);
export const category = new Category();

const header = new Header().el;
const nav = category.el;
const body = cardList.el;
const footer = new Footer().el;

root.append(header, nav, body, footer);
