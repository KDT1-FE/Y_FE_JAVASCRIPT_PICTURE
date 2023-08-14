import App from './App.js';
import router from './routes/index.js';
import './css/style.css';
import './css/header.css';
import './css/headerBanner.css';
import './css/modal.css';

const root = document.getElementById('root');
root.append(new App().el);

router();
