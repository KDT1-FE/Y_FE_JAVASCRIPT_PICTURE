import { Component } from '../core/index.js';
<<<<<<< HEAD
=======
import Store from '../store/userState.js';
>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55
import logo from '../images/logo.svg';

class Header extends Component {
    constructor() {
        super({
            tagName: 'header',
        });
<<<<<<< HEAD
    }
=======

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

>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55
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
<<<<<<< HEAD
                    <button class="btn btn-primary" id="toggleButton"></button>
=======
                    <button class="btn btn-primary" id="toggleButton">팀원찾기</button>
>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55
                </div>
            </div>
        </div>
        `;

        const toggleButton = this.el.querySelector('#toggleButton');
<<<<<<< HEAD
        toggleButton.textContent = '🏠';
        toggleButton.className = 'btn btn-primary';
=======
        toggleButton.addEventListener('click', () => {
            this.toggleMemberState();
        });

        if (Store.state.member) {
            toggleButton.textContent = '팀찾기';
            toggleButton.className = 'btn btn-secondary';
        }
>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55
    }
}

export default Header;
