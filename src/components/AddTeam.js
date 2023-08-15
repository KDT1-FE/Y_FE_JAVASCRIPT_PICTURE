import { Component } from '../core/index.js';
import imageStore from '../store/imageStoreTeam.js';
import currentImage from './AddTeamImage.js';

export default class AddTeam extends Component {
    constructor() {
        super({
            tagName: 'div',
        });
    }
    render() {
        const imageEl = new currentImage().el;
        this.el.innerHTML = /*html*/ `
        <div class="modal__banner--top">
            <div class="modal__banner--left">
                <label class="input-file-button" for="input-file">사진 업로드</label>
                <input id="input-file" class="modal__banner--form-image" style="display:none" type="file" />
            </div>
            <div class="modal__banner--right">
                <label>제작</label>
                <input class="modal__banner--form-team" type="text" name="name" />

                <label>작품 제목</label>
                <input class="modal__banner--form-title" type="text" name="" />

                <label>모집 분야</label>
                <input class="modal__banner--form-sector" type="text" name="" />

                <label>이메일</label>
                <input class="modal__banner--form-email" type="email" name="" />

            </div>
        </div>
        <div class="modal__banner--bottom">
            <label>작품 설명</label>
            <input class="modal__banner--form-description" type="text" name="" />
            <label>로그 라인</label>
            <input class="modal__banner--form-logline" type="text" name="" />
            <label>페이</label>
            <input class="modal__banner--form-pay" type="text" name="" />
        </div>
        <button class="modal__banner--form-submit btn btn-primary" type="submit">정보 등록하기</button>
        `;

        this.el.querySelector('.modal__banner--left').prepend(imageEl);

        this.el.className = 'modal__banner--form';

        // Store에 정보를 등록하는 버튼
        const submitBtn = this.el.querySelector('.modal__banner--form-submit');
        const inputEls = this.el.querySelectorAll('input');
        const imageInput = this.el.querySelector('.modal__banner--form-image');

        submitBtn.addEventListener('click', () => {
            inputEls.forEach((inputEl) => {
                const inputClassName = inputEl.className.replace(
                    'modal__banner--form-',
                    ''
                );
                const inputValue = inputEl.value;

                imageStore.state[inputClassName] = inputValue;
            });

            console.log('저장된 데이터:', imageStore.state);
            // 이후에 필요한 처리를 수행할 수 있습니다.
        });

        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    imageStore.state.src = e.target.result;
                };

                reader.addEventListener('loadstart', () => {
                    alert('loadstart');
                });

                reader.addEventListener('loadend', () => {
                    setTimeout(() => {
                        alert('loadend');
                        console.log(imageStore.state.src);
                    }, 1000);
                });

                reader.readAsDataURL(file);
            }
        });
    }
}
