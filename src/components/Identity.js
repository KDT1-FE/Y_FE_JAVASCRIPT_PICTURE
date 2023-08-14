import { Component } from '../core';
import Store from '../store/imageStore';

export default class Identity extends Component {
    constructor() {
        super();
        Store.subscribe('name', () => {
            this.render();
        });
    }
    render() {
        if (Store.state.name) {
            this.el.innerHTML = /*html*/ `
            <div>
                <h1>팀원이름 : ${Store.state.name}</h1>
            </div>
            `;
        } else {
            this.el.innerHTML = /*html*/ ``;
        }
    }
}
