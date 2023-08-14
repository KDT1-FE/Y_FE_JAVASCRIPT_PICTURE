import { Component } from '../core';
import imageStore from '../store/imageStore.js';

export default class Title extends Component {
    constructor() {
        super({
            tagName: 'h1',
        });
        imageStore.subscribe('src', (newVal) => {
            console.log('Title', newVal);
            this.render();
        });
    }
    render() {
        this.el.textContent = `Title : ${imageStore.state.src}`;
    }
}
