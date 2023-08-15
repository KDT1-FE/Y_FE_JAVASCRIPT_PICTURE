import { Component } from '../core';
import Store from '../store/userState.js';

export default class FindTeam extends Component {
    constructor() {
        super();
        Store.subscribe('member', () => {
            this.render();
        });
    }

    render() {
        if (Store.state.member) {
            this.el.innerHTML = /*html*/ `
            <div>
                <h1>팀원찾기</h1>
                <button id="getDocRef">getDocRef</button>
            </div>
            `;
        } else {
            this.el.innerHTML = /*html*/ ``;
        }
    }
}
