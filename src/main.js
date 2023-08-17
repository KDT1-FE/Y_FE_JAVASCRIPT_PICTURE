import Footer from './components/Footer.js';
import Header from './components/Header.js';
import CardList from './components/CardList.js';

const root = document.querySelector('#root');
document.documentElement.setAttribute('color-theme', 'light');

const header = new Header().el;
const body = new CardList().el;
const footer = new Footer().el;

root.append(header, body, footer);
