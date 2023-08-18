import { Component } from '../core/index.js';
import logo from '../images/logo.svg';

class Header extends Component {
    constructor() {
        super({
            tagName: 'header',
        });
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
                    <button class="btn btn-primary" id="toggleButton"></button>
                </div>
            </div>
        </div>
        `;

        const toggleButton = this.el.querySelector('#toggleButton');
        toggleButton.textContent = '🏠';
        toggleButton.className = 'btn btn-primary';
    }
}

export default Header;
