import { Component } from '../core';
import { setData } from '../dispatch';
import submitState from '../store/submitState';
import modalSubmitState from '../store/modalSubmitState';

export default class AddSubmitAssure extends Component {
    constructor() {
        super({
            tagName: 'button',
        });
    }
    render() {
        this.el.classList.add('btn', 'btn-primary');
        this.el.textContent = 'YES';
        this.el.addEventListener('click', () => {
            alert('YES');
            setData();
            submitState.state.submit = false;
            modalSubmitState.state.submit = false;
        });
    }
}
