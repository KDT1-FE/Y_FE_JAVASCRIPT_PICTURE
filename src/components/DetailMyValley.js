import { Component } from '../core';
import Store from '../store/myValley.js';

import UpdateAndDeleteModal from '../components/UpdateMyValley';

export default class DetailMyValley extends Component {
    constructor() {
        super();

        Store.subscribe('url', () => {
            this.render();
            this.storeElement();
            this.setEventListener();
        });
    }
    render() {
        this.el.innerHTML = /*html*/ `
        <div class="about__banner--left">
            <div class="about__banner--left-container">
                <div class="about__banner--image"></div>
            </div>
        </div>
        <div class="about__banner--right">
            <div class="about__banner--right-container">
                <div class="about__banner--title">
                    <h1 class="about__banner--title-name">계곡 이름 로딩중...</h1>
                    <p class="about__banner--title-nickname"><b class="nickname">${Store.state.nickname}</b>님의 숨은 포인트📌</p>
                </div>
                <div class="about__banner--content">
                    <p class="about__banner--content-province">경기도</p>
                    <p class="about__banner--content-city">수원시</p>
                </div>
                <div class="about__banner--additional"></div>
                <div class="about__banner--address">
                    <button class="about__banner--address-button btn btn-primary">지도보기</button>
                    <button class="update-btn btn btn-secondary">정보수정하기</button>
                </div>
            </div>
        </div>
        `;
        this.el.classList.add('about__banner--item');
    }
    storeElement() {
        const nameEl = this.el.querySelector('.about__banner--title-name');
        nameEl.textContent = Store.state.name;

        const imageEl = this.el.querySelector('.about__banner--image');
        imageEl.style.backgroundImage = `url(${Store.state.url})`;

        const provinceEl = this.el.querySelector('.about__banner--content-province');
        provinceEl.textContent = Store.state.province;

        const cityEl = this.el.querySelector('.about__banner--content-city');
        cityEl.textContent = Store.state.city;

        const additionalEl = this.el.querySelector('.about__banner--additional');
        additionalEl.textContent = Store.state.additional;

        const addressEl = this.el.querySelector('.about__banner--address-button');
        addressEl.addEventListener('click', () => {
            window.open(Store.state.address);
        });
    }

    setEventListener() {
        const updateAndDeleteModalEl = new UpdateAndDeleteModal().el;

        const updateButton = this.el.querySelector('.update-btn');
        updateButton.addEventListener('click', () => {
            updateAndDeleteModalEl.classList.add('active');
            this.el.append(updateAndDeleteModalEl);
        });
    }
}
