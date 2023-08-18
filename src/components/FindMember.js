import { Component } from '../core';
import Store from '../store/userState.js';

export default class FindMember extends Component {
    constructor() {
        super();
        Store.subscribe('member', () => {
            this.render();
        });
    }
    render() {
        if (!Store.state.member) {
            this.el.innerHTML = /*html*/ `
            <div>
                <h1>팀 찾기</h1>
            </div>
            `;
        } else {
            this.el.innerHTML = /*html*/ ``;
        }
    }
}
