import { Component } from '../core';

export default class AddTeam extends Component {
    render() {
        this.el.innerHTML = /*html*/ `
        <div>
            <h1>팀원 추가</h1>
        </div>
        `;
    }
}
