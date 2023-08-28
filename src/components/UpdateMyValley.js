import { Component } from '../core';

import Store from '../store/myValley.js';
import modalState from '../store/modalSubmitState';

import myValleyStoreImage from './UpdateMyValleyImage';
import AddUpdate from './AddUpdate';

export default class UpdateAndDeleteModal extends Component {
    constructor() {
        super();
        modalState.subscribe('submit', () => {
            this.el.classList.remove('active');
        });
        this.setCloseEventListener();
        this.setUpdateEventListener();
        this.setDeleteEventListener();
        this.setImageEventListener();
    }

    render() {
        this.el.innerHTML = /*html*/ `
            <div class="fix__modal--container">
                <div class="fix__modal--wrapper">
                    <div class="fix__modal--items">
                        <div class="fix__modal--left">
                            <div class="fix__modal--top-container">
                                <div class="fix__modal--top-image"></div>
                                <label class="input-file-button" for="input-file"
                                    >사진 변경하기</label
                                >
                                <input
                                    id="input-file"
                                    class="modal__banner--form-image"
                                    style="display: none"
                                    type="file"
                                />
                            </div>
                            <div class="fix__modal--buttons">
                                <button class="updateBtn">수정</button>
                                <button class="deleteButton">삭제</button>
                            </div>
                        </div>
                        <div class="fix__modal--right">
                            <label>나만의 닉네임 (영어로 적어주세요) </label>
                            <input class="modal__banner--form-nickname" type="text" value="${Store.state.nickname}"/>

                            <label>계곡이름</label>
                            <input class="modal__banner--form-name" type="text" value="${Store.state.name}" />

                            <label>도</label>
                            <input class="modal__banner--form-province" type="text" value="${Store.state.province}" />

                            <label>읍,면,시</label>
                            <input class="modal__banner--form-city" type="text" value="${Store.state.city}" />

                            <label
                                >나만의 POINT GPS 주소
                                <a href="https://www.google.co.kr/maps/?hl=ko" target="_blank">(구글지도가기)</a></label
                            >
                            <input class="modal__banner--form-address" type="text"  value="${Store.state.address}" />
                            <label>추가 설명</label>
                            <input class="modal__banner--form-additional" type="text"  value="${Store.state.additional}" />
                        </div>
                    </div>
                </div>
                <button class="fix__modal--close">X</button>
            </div>
        `;
        this.el.classList.add('fix__modal');
    }
    setCloseEventListener() {
        const closeButton = this.el.querySelector('.fix__modal--close');
        closeButton.addEventListener('click', () => {
            this.el.classList.remove('active');
        });
    }

    setUpdateEventListener() {
        const inputValueElements = this.el.querySelectorAll('input');
        const updateBtn = this.el.querySelector('.updateBtn');
        const assureButtonAdd = this.el.querySelector('.fix__modal--wrapper');

        updateBtn.addEventListener('click', () => {
            inputValueElements.forEach((inputEl) => {
                // inputEl의 className을 가져옵니다.
                const inputClassName = inputEl.className.replace('modal__banner--form-', '');
                const inputValue = inputEl.value;

                // inputValue를 Store에 등록합니다.
                Store.state[inputClassName] = inputValue;
            });

            const state = 'update';

            // 확인 버튼을 불러옵니다.
            const AddUpdateElement = new AddUpdate(state).el;
            AddUpdateElement.classList.add('active');
            assureButtonAdd.append(AddUpdateElement);
        });
    }

    setDeleteEventListener() {
        const inputValueElements = this.el.querySelectorAll('input');
        const deleteButton = this.el.querySelector('.deleteButton');
        const assureButtonAdd = this.el.querySelector('.fix__modal--wrapper');
        deleteButton.addEventListener('click', () => {
            inputValueElements.forEach((inputValueElement) => {
                // inputEl의 className을 가져옵니다.
                const inputClassName = inputValueElement.className.replace('modal__banner--form-', '');
                const inputValue = inputValueElement.value;

                // inputValue를 Store에 등록합니다.
                Store.state[inputClassName] = inputValue;
            });

            const state = 'delete';

            // 확인 버튼을 불러옵니다.
            const AddUpdateElement = new AddUpdate(state).el;
            AddUpdateElement.classList.add('active');
            assureButtonAdd.append(AddUpdateElement);
        });
    }
    setImageEventListener() {
        const imageViewElement = new myValleyStoreImage().el;

        this.el.querySelector('.fix__modal--top-image').append(imageViewElement);
        const imageInput = this.el.querySelector('.modal__banner--form-image');
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            Store.state.file = file;
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    Store.state.src = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        });
    }
}
