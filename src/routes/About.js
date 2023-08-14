import { Component } from '../core/index.js';

export default class About extends Component {
    render() {
        const { a, b } = history.state;
        this.el.innerHTML = /*html*/ `
                <h1>About</h1>
                <p>About 화면입니다.</p>
                <p>a: ${a}</p>
                <p>b: ${b}</p>
                `;
    }
}
