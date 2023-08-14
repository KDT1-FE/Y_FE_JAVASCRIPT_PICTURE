import { Component } from '../core/index.js';
import Store from '../store/userState.js';
import logo from '../images/logo.svg';

class Header extends Component {
    constructor() {
        super({
            tagName: 'header',
        });

        Store.subscribe('member', () => {
            this.render();
        });
    }

    toggleMemberState() {
        const currentMemberState = Store.state.member;
        const newMemberState = !currentMemberState;
        Store.state.member = newMemberState;
        alert(Store.state.member);
    }

    render() {
        this.el.innerHTML = /*html*/ `
        <div class="header__container">
            <div class="header__left">
                <div class="header__left--logo">
                    <img class="header__left--logo-image" src="${logo}" alt="logo" />
                </div>
            </div>
            <div class="header__right">
                <div class="header__right--navigation">
                    <a href="#/">HOME</a>
                    <a href="#/about">ABOUT!</a>
                </div>
                <div class="header__right--toggle-button">
                    <button class="btn btn-primary" id="toggleButton">팀원찾기</button>
                </div>
            </div>
        </div>
        `;

        const toggleButton = this.el.querySelector('#toggleButton');
        toggleButton.addEventListener('click', () => {
            this.toggleMemberState();
        });

        if (Store.state.member) {
            toggleButton.textContent = '팀찾기';
            toggleButton.className = 'btn btn-secondary';
        }
    }
}

export default Header;
