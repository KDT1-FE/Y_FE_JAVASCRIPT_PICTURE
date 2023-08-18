import { Component } from '../core/index.js';
import submitState from '../store/modalSubmitState.js';
import AddMember from '../components/AddMyValley.js';
import View from '../components/View.js';

import image from '../images/logo.gif';

export default class Home extends Component {
    constructor() {
        super();

        submitState.subscribe('submit', () => {
            const modalContainer = this.el.querySelector('.modal__container');
            try {
                modalContainer.classList.remove('modal__active');
            } catch {}
        });
    }
    render() {
        const AddMemberEl = new AddMember().el;
        const ViewEl = new View().el;

        this.el.innerHTML = /*html*/ `
            <div class="header__banner">
                <h1 class="header__banner--title">나만의 <span></span>포인트를 등록하세요</h1>
                <p class="header__banner--description">
                    1분만에 당신에게 맞는 최적의 조건을 가진 계곡을 검색해서 지금 당장 떠나보세요<br/>
                    그리고 당신만의 계곡 포인트를 찾아서 공유해보세요!

                </p>
                <button class="header__modal--button btn"></button>
            </div>
            `;
        // 해당 컴포넌트에 클래스 추가
        this.el.classList.add('home__container');

        const backgroundImageEl = this.el.querySelector('.header__banner');
        backgroundImageEl.style.backgroundImage = `url(${image})`;
        backgroundImageEl.style.backgroundPositionY = `${window.scrollY * 0.2}%`;

        // 사용할 element들 정의
        const buttonEl = this.el.querySelector('.header__modal--button');
        const modalContainer = this.el.querySelector('.header__banner');

        // 현제 계곡, 산 상태에 따른 컴포넌트 택스트 변경
        this.el.querySelector('.header__banner--title span').textContent = '계곡';
        buttonEl.classList.add('btn-secondary');
        buttonEl.textContent = '나만의 계곡 등록하기';

        // 모달창을 여는 버튼의 이벤트 설정
        buttonEl.addEventListener('click', () => {
            AddMemberEl.classList.add('modal__active');
            modalContainer.append(AddMemberEl);
        });

        this.el.append(ViewEl);

        const scrollMovement = (e) => {
            const scrollTop = window.scrollY;
            const scrollY = `${scrollTop * 0.2}%`;

            backgroundImageEl.style.backgroundPositionY = scrollY;
            if (scrollTop * 0.2 > 95) {
                backgroundImageEl.style.backgroundPositionY = `95%`;
            }
        };

        window.addEventListener('scroll', scrollMovement);
    }
}
