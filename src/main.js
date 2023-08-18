import App from './App.js';
import router from './routes/index.js';
import Firstpage from './components/FirstPage.js';
import './css/style.css';
import './css/header.css';
import './css/headerBanner.css';
import './css/modal.css';
import './css/viewBanner.css';
import './css/detailBanner.css';
import './css/fixModal.css';
import './css/moveUp.css';
import './css/firstpage.css';

const root = document.getElementById('root');

// 첫 번째 방문 여부 확인
const isFirstVisit = localStorage.getItem('isFirstVisit') === null;

if (isFirstVisit) {
    // 첫 번째 방문 시에는 Firstpage를 보여주고, App은 숨기기
    const firstpage = new Firstpage().el;
    root.append(firstpage);

    // 첫 번째 방문 기록
    localStorage.setItem('isFirstVisit', 'false');
} else {
    // 이미 방문한 경우에는 App을 보여줌
    const app = new App().el;
    root.append(app);
    router();
}
