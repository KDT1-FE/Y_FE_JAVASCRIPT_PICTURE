import { Component } from '../core';
import AddUpdateAssure from './AddUpdateAssure.js';

export default class AddUpdate extends Component {
    constructor(props) {
        super({
            props,
        });
    }
    render() {
        const state = this.props;
        let stateValue = '';
        if (state === 'update') {
            stateValue = '업데이트';
        } else if (state === 'delete') {
            stateValue = '삭제';
        }

        const AddUpdateAssureEl = new AddUpdateAssure(state).el;
        this.el.classList.add('update-submit');
        this.el.innerHTML = /* html */ `
        <div class="update-submit__container">
            <div class="update-submit__wrapper">
                <div class="update-submit__top">
                    <h1>정말 ${stateValue}하시겠습니까?</h1>
                </div>
                <div class="update-submit__bottom">
                    <button class="update-submit__cancel">취소</button>
                </div>
            </div>
        </div>
        `;
        const bottomEl = this.el.querySelector('.update-submit__bottom');
        bottomEl.prepend(AddUpdateAssureEl);

        const cancelBtn = this.el.querySelector('.update-submit__cancel');
        cancelBtn.addEventListener('click', () => {
            this.el.classList.remove('active');
        });
    }
}
