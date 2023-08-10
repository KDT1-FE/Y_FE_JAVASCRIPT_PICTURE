import Footer from './components/Footer.js';
import Header from './components/Header.js';

const root = document.querySelector('#root');

const header = new Header().el;
const body = document.createElement('h1');
body.innerText = 'hello!';
const footer = new Footer().el;

root.append(header, body, footer);
