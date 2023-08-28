import { set } from 'lodash';
import { Component } from '../core';

export default class Firstpage extends Component {
    constructor() {
        super();
        this.setLiItems();
        this.setIntersectionObserverObject();
        this.setEventListener();
    }
    render() {
        this.el.innerHTML = /*html*/ `
        <div class="first__page--wrapper">
            <div class="first__page--content">
                <p>더운 여름에는 대한민국의 시원한 계곡과 함께</p>
                <p class="first__page--title">VALLEY KOREA</p>
            </div>
            <ul class="first__page--list">
                <li id="next_add" class="fist-space space">아래로 스크롤 해보세요</li>
                <li class="last-space space">
                    <button type="button" class="enter__button">ENTER</button>
                </li>           
            </ul>
        </div>
    `;
        this.el.classList.add('first__page');
    }
    setLiItems() {
        const targeter = this.el.querySelector('.first__page--list');
        const targeterSpace = this.el.querySelector('#next_add');

        const iconList = ['✨', '🐟', '✅', '😲', '✈️', '🏳️‍⚧️', '🏠', '☕', '📸', '🚗'].reverse();
        const itemList = [
            '서울',
            '대전',
            '대구',
            '부산',
            '강원도',
            '충청남도',
            '충청북도',
            '경상남도',
            '경상북도',
            '경기도',
            '대한민국방방곳곳',
            '아름다운계곡들',
            '남이섬계곡',
            '삼학사계곡',
            '청계천',
            '설악산계곡',
            '월정사계곡',
            '대청호계곡',
            '소백산계곡',
            '영종도계곡',
            '지리산계곡',
            '뱀삿골계곡',
            '백운계곡',
            '구례강서계곡',
            '삼척강촌계곡',
            '오대산계곡',
            '무등산계곡',
            '경주안강계곡',
            '강릉송정계곡',
            '홍천청평계곡',
            '홍천군노고단계곡',
            '원주시함박계곡',
            '무릉계곡',
            '양평계곡',
            '밀양시밀양천곡',
            '문경강곡',
            '인제임동계곡',
            '곡성금수산계곡',
            '춘천두물머리계곡',
            '양양임나무계곡',
            '구곡계곡',
            '보령소백산맥계곡',
            '임실군대야산계곡',
            '안동동호천계곡',
            '대전계룡산국립공원계곡',
            '군산천마산계곡',
            '선유도계곡',
            '장군봉계곡',
            '남해독일마을계곡',
            '순천우포늪계곡',
            '가라산계곡',
            '강진강계곡',
            '목포백제해수욕장계곡',
            '외암골계곡',
            '홍천우레골계곡',
            '인동계곡',
            '고성미타리계곡',
            '마로길계곡',
            '인제상봉골계곡',
            '가평용소계곡',
        ];

        (function createLiItems() {
            itemList.reverse().forEach((item, index) => {
                const newLiItem = document.createElement('li');
                newLiItem.classList.add('first__page--list-item');
                const iconNumber = Math.floor(index % 10);
                newLiItem.innerText = `${iconList[iconNumber]}` + item;
                targeter.insertBefore(newLiItem, targeterSpace.nextSibling);
            });
        })();
    }

    setIntersectionObserverObject() {
        //intersection observer

        const targeter = this.el.querySelector('.first__page--list');
        const target = this.el.querySelectorAll('.first__page--list-item');

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
                const x = 0.1;
                createObserver(x);
            } else if (windowWidth > 400) {
                const x = 0.2;
                createObserver(x);
            } else {
                const x = 0.3;
                createObserver(x);
            }
        }

        window.addEventListener('resize', updateObserver);

        // 초기화
        updateObserver();
    }

    setEventListener() {
        // enter button
        const enterButton = this.el.querySelector('.enter__button');
        enterButton.addEventListener('click', () => {
            alert('🎇환영합니다🎇');
            location.reload();
        });
    }
}
