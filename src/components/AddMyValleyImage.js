import { Component } from '../core';
import Store from '../store/myValley.js';
import placeHorderImage from '../images/placeHorderImage.png';

export default class Message extends Component {
    constructor() {
        super();
        Store.subscribe('src', () => {
            this.render();
        });
    }
    render() {
        const placeHorderimageElement = placeHorderImage;
        const imageElement = Store.state.src || placeHorderimageElement;

        this.el.innerHTML = /*html*/ `
        <a href="javascript:void(0)" class="modal__banner--image-wrapper">
            <img class="modal__banner--image" src="${imageElement}" alt= "이미지파일이 없습니다"/>
        </a>
        `;
        this.el.className = 'modal__banner--image-container';
    }
}
