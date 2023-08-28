import { Component } from '../core';
import up from '../images/up.svg';

export default class MoveUp extends Component {
    constructor() {
        super();
        this.setEventListener();
    }
    render() {
        this.el.innerHTML = /*html*/ `
            <div class="move-up__wrapper">
                <div class="move-up__button">
                    <img class="move-up__button--image" src="${up}" alt="up" />
                </div>
                <p>TOP</p>
            </div>
        `;
        this.el.classList.add('move-up__container');
    }

    setEventListener() {
        const moveUpButton = this.el.querySelector('.move-up__wrapper');
        moveUpButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
