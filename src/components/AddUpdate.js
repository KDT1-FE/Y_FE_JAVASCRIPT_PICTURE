import { Component } from '../core';
import AddUpdateAssure from './AddUpdateAssure.js';

export default class AddUpdate extends Component {
    constructor(props) {
        super({
            props,
        });
        this.addElement();
        this.setEventListener();
    }
    render() {
        this.el.classList.add('update-submit');
        this.el.innerHTML = /* html */ `
        <div class="update-submit__container">
            <div class="update-submit__wrapper">
                <div class="update-submit__top">
                    <h1></h1>
                </div>
                <div class="update-submit__bottom">
                    <button class="update-submit__cancel">취소</button>
                </div>
            </div>
        </div>
        `;
    }
    addElement() {
        const state = this.props;
        let stateValue = '';
        if (state === 'update') {
            stateValue = '업데이트';
        } else if (state === 'delete') {
            stateValue = '삭제';
        } else {
            this.el.classList.remove('active');
        }

        const AddUpdateText = this.el.querySelector('.update-submit__top h1');
        AddUpdateText.textContent = `데이터를 ${stateValue}하시겠습니까?`;

        const AddUpdateAssureEl = new AddUpdateAssure(state).el;
        const bottomPlace = this.el.querySelector('.update-submit__bottom');
        bottomPlace.prepend(AddUpdateAssureEl);
    }

    setEventListener() {
        const cancelButton = this.el.querySelector('.update-submit__cancel');
        cancelButton.addEventListener('click', () => {
            this.el.classList.remove('active');
        });
    }
}
