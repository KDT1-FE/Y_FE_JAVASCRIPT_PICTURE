import { Component } from '../core';
import Store from '../store/involvedValley.js';

export default class InvolvedValley extends Component {
    render() {
        this.el.innerHTML = /*html*/ `
            <div class="involved-valley__container">
                나왔어
            </div>
        `;

        console.log(Store.state.valleyList);
        this.el.style.backgroundColor = 'red';
        this.el.style.width = '100%';
        this.el.style.height = '100%';
    }
}
