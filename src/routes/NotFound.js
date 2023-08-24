import { Component } from '../core';

export default class NotFound extends Component {
    render() {
        this.el.classList.add('not-found');
        this.el.innerHTML = /*html*/ `
            <div class="not-found__container">
                <div class="not-found__text">페이지를 찾을 수 없습니다.</div>
                <div class="not-found__text">404</div>
            </div>
        `;
    }
}
