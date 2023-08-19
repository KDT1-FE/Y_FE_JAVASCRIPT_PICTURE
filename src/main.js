import Footer from './components/Footer.js';
import Header from './components/Header.js';
import CardList from './components/CardList.js';
import { setData } from './firebase/data.js';

const root = document.querySelector('#root');
document.documentElement.setAttribute('color-theme', 'light');

const initData = [];
await setData().then((res) => {
  res.forEach((el) => initData.push(el));
});

const header = new Header().el;
export const cardList = new CardList(initData);
const body = cardList.el;
const footer = new Footer().el;

root.append(header, body, footer);
