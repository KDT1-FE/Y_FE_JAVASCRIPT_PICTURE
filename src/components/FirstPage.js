import { Component } from '../core';

export default class Firstpage extends Component {
    render() {
        this.el.innerHTML = /*html*/ `
        <div class="first__page--wrapper">
            <div class="first__page--content">
                <p>더운 여름에는 대한민국의 시원한 계곡과 함께</p>
                <p class="first__page--title">VALLEY KOREA</p>
            </div>
            <ul class="first__page--list">
                <div class="fist-space space">아래로 스크롤 해보세요</div>
                <li class="first__page--list-item">✨서울</li>
                <li class="first__page--list-item">🐟대전</li>
                <li class="first__page--list-item">✅대구</li>
                <li class="first__page--list-item">😲부산</li>
                <li class="first__page--list-item">✈️강원도</li>
                <li class="first__page--list-item">🏳️‍⚧️충청남도</li>
                <li class="first__page--list-item">🏠충청북도</li>
                <li class="first__page--list-item">☕경상남도</li>
                <li class="first__page--list-item">📸경상북도</li>
                <li class="first__page--list-item">🚗경기도</li>
                <li class="first__page--list-item">✨대한민국방방곳곳</li>
                <li class="first__page--list-item">🐟아름다운계곡들</li>
                <li class="first__page--list-item">✅남이섬계곡</li>
                <li class="first__page--list-item">😲삼학사계곡</li>
                <li class="first__page--list-item">✈️청계천</li>
                <li class="first__page--list-item">🏳️‍⚧️설악산계곡</li>
                <li class="first__page--list-item">🏠월정사계곡</li>
                <li class="first__page--list-item">☕대청호계곡</li>
                <li class="first__page--list-item">📸소백산계곡</li>
                <li class="first__page--list-item">🚗영종도계곡</li>
                <li class="first__page--list-item">✨지리산계곡</li>
                <li class="first__page--list-item">🐟뱀삿골계곡</li>
                <li class="first__page--list-item">✅백운계곡</li>
                <li class="first__page--list-item">😲구례강서계곡</li>
                <li class="first__page--list-item">✈️삼척강촌계곡</li>
                <li class="first__page--list-item">🏳️‍⚧️오대산계곡</li>
                <li class="first__page--list-item">🏠무등산계곡</li>
                <li class="first__page--list-item">☕경주안강계곡</li>
                <li class="first__page--list-item">📸강릉송정계곡</li>
                <li class="first__page--list-item">🚗홍천청평계곡</li>
                <li class="first__page--list-item">✨홍천군노고단계곡</li>
                <li class="first__page--list-item">🐟원주시함박계곡</li>
                <li class="first__page--list-item">✅무릉계곡</li>
                <li class="first__page--list-item">😲양평계곡</li>
                <li class="first__page--list-item">✈️밀양시밀양천곡</li>
                <li class="first__page--list-item">🏳️‍⚧️문경강곡</li>
                <li class="first__page--list-item">🏠인제임동계곡</li>
                <li class="first__page--list-item">☕곡성금수산계곡</li>
                <li class="first__page--list-item">📸춘천두물머리계곡</li>
                <li class="first__page--list-item">🚗양양임나무계곡</li>
                <li class="first__page--list-item">✨구곡계곡</li>
                <li class="first__page--list-item">✅보령소백산맥계곡</li>
                <li class="first__page--list-item">🐟임실군대야산계곡</li>
                <li class="first__page--list-item">😲안동동호천계곡</li>
                <li class="first__page--list-item">✈️대전계룡산국립공원계곡</li>
                <li class="first__page--list-item">🏳️‍⚧️군산천마산계곡</li>
                <li class="first__page--list-item">🏠선유도계곡</li>
                <li class="first__page--list-item">☕장군봉계곡</li>
                <li class="first__page--list-item">📸남해독일마을계곡</li>
                <li class="first__page--list-item">🚗순천우포늪계곡</li>
                <li class="first__page--list-item">✨가라산계곡</li>
                <li class="first__page--list-item">🐟강진강계곡</li>
                <li class="first__page--list-item">✅목포백제해수욕장계곡</li>
                <li class="first__page--list-item">😲외암골계곡</li>
                <li class="first__page--list-item">✈️홍천우레골계곡</li>
                <li class="first__page--list-item">🏳️‍⚧️인동계곡</li>
                <li class="first__page--list-item">🏠고성미타리계곡</li>
                <li class="first__page--list-item">☕마로길계곡</li>
                <li class="first__page--list-item">📸인제상봉골계곡</li>
                <li class="first__page--list-item">🚗가평용소계곡</li>
                <div class="last-space space">
                    <button class="enter__button">ENTER</button>
                </div>
                
            </ul>
        </div>
    `;
        this.el.classList.add('first__page');

        //intersection observer
        const target = this.el.querySelectorAll('.first__page--list-item');
        const targeter = this.el.querySelector('.first__page--list');

        function createObserver(threshold) {
            const options = {
                root: targeter,
                rootMargin: `${-49}% 0px ${-49}%`,
                threshold: threshold,
            };

            const callback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    } else {
                        entry.target.classList.remove('active');
                    }
                });
            };

            const observer = new IntersectionObserver(callback, options);

            target.forEach((item) => {
                observer.observe(item);
            });
        }

        function updateObserver() {
            const windowWidth = window.innerWidth;
            if (windowWidth > 800) {
                const x = 0.05;
                createObserver(x);
            } else if (windowWidth > 600) {
                const x = 0.4;
                createObserver(x);
            } else if (windowWidth > 400) {
                const x = 0.5;
                createObserver(x);
            } else {
                const x = 0.7;
                createObserver(x);
            }
        }

        window.addEventListener('resize', updateObserver);

        // 초기화
        updateObserver();

        // enter button
        const enterButton = this.el.querySelector('.enter__button');
        enterButton.addEventListener('click', () => {
            alert('🎇환영합니다🎇');
            location.reload();
        });
    }
}
