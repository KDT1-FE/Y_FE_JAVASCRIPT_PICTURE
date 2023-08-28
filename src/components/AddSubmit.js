import { Component } from '../core';
import submitState from '../store/submitState';
import AddSubmitAssure from './AddSubmitAssure';

export default class AddSubmit extends Component {
    constructor() {
        super();
        this.addElement();
        this.setEventListener();
    }
    render() {
        this.el.classList.add('add-submit');
        this.el.innerHTML = /* html */ `
            <div class="add-submit__top">
                <h1>데이터를 저장하시겠습니까?</h1>
            </div>
            <div class="add-submit__bottom">
                <button type="button" class="add-submit__cancel">취소</button>
            </div>
        `;
    }
    addElement() {
        const AddSubmitAssureEl = new AddSubmitAssure().el;
        const bottomPlace = this.el.querySelector('.add-submit__bottom');
        bottomPlace.prepend(AddSubmitAssureEl);
    }

    setEventListener() {
        const cancelButton = this.el.querySelector('.add-submit__cancel');
        cancelButton.addEventListener('click', () => {
            submitState.state.submit = false;
        });
    }
}
