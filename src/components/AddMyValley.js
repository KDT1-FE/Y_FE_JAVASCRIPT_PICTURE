import { Component } from '../core/index.js';

import myValleyStore from '../store/myValley.js';
import submitState from '../store/submitState.js';

import AddSubmit from './AddSubmit.js';
import myValleyStoreImage from './AddMyValleyImage.js';

export default class AddMember extends Component {
    constructor() {
        super();
        submitState.subscribe('submit', () => {
            const addSubmitElement = this.el.querySelector('.modal__banner--form-assure');
            if (!submitState.state.submit) {
                addSubmitElement.classList.remove('active');
                addSubmitElement.innerHTML = '';
            }
        });
        this.addElement();
        this.setSubmitEventListener();
        this.setImageEventListener();
        this.setCloseEventListener();
    }

    render() {
        this.el.innerHTML = /*html*/ `
        <div class="modal__wrapper">
            <div class="modal__header">
                <p>계곡 사진과 정보를 입력하세요</p>
                <button class="modal__close">X</button>
            </div>
            <div class="modal__content">
                <div class="modal__banner--form">
                    <div class="modal__banner--top">
                        <div class="modal__banner--left">
                            <label class="input-file-button" for="input-file"
                                >사진 업로드</label
                            >
                            <input
                                id="input-file"
                                class="modal__banner--form-image"
                                style="display: none"
                                type="file"
                                />
                            </div>
                            <div class="modal__banner--right">
                                <label>나만의 닉네임 (영어로 적어주세요) </label>
                                <input class="modal__banner--form-nickname" type="text" />
                                
                                <label>계곡이름</label>
                                <input class="modal__banner--form-name" type="text" />
                                
                                <label>도</label>
                                <input class="modal__banner--form-province" type="text" />
                                
                                <label>읍,면,시</label>
                            <input class="modal__banner--form-city" type="text" />
                            
                            <label>나만의 POINT GPS 주소  <a href="https://www.google.co.kr/maps/?hl=ko" target="_blank">(구글지도가기)</a></label>
                            <input class="modal__banner--form-address" type="email" />
                        </div>
                    </div>
                    <div class="modal__banner--bottom">
                        <label>추가 설명</label>
                        <input class="modal__banner--form-additional" type="text" />
                    </div>
                    <button
                        class="modal__banner--form-submit btn btn-primary"
                        type="submit"
                        >
                        정보 등록하기
                    </button>
                    <div class="modal__banner--form-assure"></div>
                </div>
            </div>
        </div>
        `;
        // 해당 Compoenent에 class를 추가합니다.
        this.el.className = 'modal__container';
    }
    addElement() {
        // 해당 컴포넌트에 사진을 보여주는 부분을 추가합니다.
        const imageContainer = new myValleyStoreImage().el;
        this.el.querySelector('.modal__banner--left').prepend(imageContainer);
    }

    setSubmitEventListener() {
        const addSubmit = this.el.querySelector('.modal__banner--form-assure');
        const inputValueElements = this.el.querySelectorAll('input');
        const submitButton = this.el.querySelector('.modal__banner--form-submit');

        const addSubmitElement = new AddSubmit().el;

        submitButton.addEventListener('click', () => {
            inputValueElements.forEach((inputValueElement) => {
                // inputEl의 className을 가져옵니다.
                const inputClassName = inputValueElement.className.replace('modal__banner--form-', '');
                const inputValue = inputValueElement.value;

                // inputValue를 Store에 등록합니다.
                myValleyStore.state[inputClassName] = inputValue;
            });

            // 확인 버튼을 불러옵니다.
            addSubmit.classList.add('active');
            addSubmit.append(addSubmitElement);
        });
    }

    setImageEventListener() {
        const imageInput = this.el.querySelector('.modal__banner--form-image');

        // 사진을 등록합니다.
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            myValleyStore.state.file = file;
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    myValleyStore.state.src = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        });
    }

    setCloseEventListener() {
        // 모달을 닫습니다.

        const closeButton = this.el.querySelector('.modal__close');

        closeButton.addEventListener('click', () => {
            this.el.classList.remove('modal__active');
        });
    }
}
