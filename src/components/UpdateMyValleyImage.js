import { Component } from '../core';
import Store from '../store/myValley.js';

export default class Message extends Component {
    constructor() {
        super();
        Store.subscribe('src', () => {
            this.render();
        });
    }
    render() {
        const placeHorderimageElement = Store.state.url;
        const imageElement = Store.state.src || placeHorderimageElement;

        this.el.innerHTML = /*html*/ `
        <a href="javascript:void(0)" class="fix-modal__banner--image-wrapper">
            <img class="fix-modal__banner--image" src="${imageElement}" alt= "이미지파일이 없습니다"/>
        </a>
        `;
        this.el.className = 'fix-modal__banner--image-container';
    }
}
