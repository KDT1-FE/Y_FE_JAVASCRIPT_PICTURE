import { Component } from '../core';
import submitState from '../store/submitState';
import AddSubmitAssure from './AddSubmitAssure';

export default class AddSubmit extends Component {
    render() {
        const AddSubmitAssureEl = new AddSubmitAssure().el;
        this.el.classList.add('add-submit');
        this.el.innerHTML = /* html */ `
            <div class="add-submit__top">
                <h1>데이터를 저장하시겠습니까?</h1>
            </div>
            <div class="add-submit__bottom">
                <button class="add-submit__cancel">취소</button>
            </div>
        `;
        const bottomEl = this.el.querySelector('.add-submit__bottom');
        bottomEl.prepend(AddSubmitAssureEl);

        const cancelBtn = this.el.querySelector('.add-submit__cancel');
        cancelBtn.addEventListener('click', () => {
            submitState.state.submit = false;
        });
    }
}
