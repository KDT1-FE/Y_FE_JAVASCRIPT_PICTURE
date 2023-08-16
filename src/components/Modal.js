import { uploadImage, updateData } from '../firebase/data.js';
import SaveButton from './SaveButton.js';

export default class Modal {
  constructor(info = {}, type, id) {
    this.el = document.createElement('div');
    this.id = id;
    this.info = {
      photo: info.photo,
      name: info.name,
      email: info.email,
      phone: info.phone,
      department: info.department,
    };
    this.type = type;
    this.render();
  }

  render() {
    this.el.classList.add('modal');
    const containerEl = document.createElement('div');
    containerEl.classList.add('modal_container');
    containerEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const {
      name = '',
      photo,
      email = '',
      phone = '',
      department = '',
    } = this.info;

    // info
    const infoEl = document.createElement('div');
    infoEl.classList.add('info');

    // info - image
    const infoImgEl = document.createElement('div');
    infoImgEl.classList.add('info_img');
    const inputImgEl = document.createElement('div');
    inputImgEl.classList.add('img_upload');
    inputImgEl.innerHTML = `
        <label for="img_file"><span>이미지 변경하기</span></label>
        <input style="display:none" type="file" id="img_file" accept='image/*' />
      `;
    const imgEl = document.createElement('img');
    imgEl.setAttribute(
      'src',
      `${
        photo
          ? photo
          : 'https://firebasestorage.googleapis.com/v0/b/wanna-go-home-9ebdc.appspot.com/o/empty_user.png?alt=media&token=507c8fc6-6407-4c4f-8627-fe33ed36539f'
      }`
    );

    infoImgEl.append(inputImgEl, imgEl);

    inputImgEl.addEventListener('click', () => {
      const imgFile = this.el.querySelector('#img_file');
      imgFile.addEventListener('input', (e) => {
        const file_name = `${name}_` + e.currentTarget.files[0].name;
        const file = e.currentTarget.files[0];
        uploadImage(file_name, file, imgEl);
      });
    });

    // info - text
    const infoTxtEl = document.createElement('div');
    infoTxtEl.classList.add('info_txt');
    const inputNameEl = document.createElement('input');
    inputNameEl.setAttribute('placeholder', '이름');
    inputNameEl.setAttribute('name', 'name');
    inputNameEl.value = name;
    const inputEmailEl = document.createElement('input');
    inputEmailEl.setAttribute('placeholder', '이메일');
    inputEmailEl.setAttribute('type', 'email');
    inputEmailEl.setAttribute('name', 'email');
    inputEmailEl.value = email;
    const inputPhoneEl = document.createElement('input');
    inputPhoneEl.setAttribute('placeholder', '핸드폰 번호');
    inputPhoneEl.setAttribute('type', 'tel');
    inputPhoneEl.setAttribute('name', 'phone');
    inputPhoneEl.value = phone;
    const inputDepartmentEl = document.createElement('input');
    inputDepartmentEl.setAttribute('placeholder', '소속부서');
    inputDepartmentEl.setAttribute('name', 'department');
    inputDepartmentEl.value = department;

    infoTxtEl.append(
      inputNameEl,
      inputPhoneEl,
      inputEmailEl,
      inputDepartmentEl
    );
    infoEl.append(infoImgEl, infoTxtEl);

    // save button
    const saveBtnEl = new SaveButton(this.type, this.id).el;
    saveBtnEl.addEventListener('click', () => {
      this.el.remove();
    });

    // modal close
    const closeBtnEl = document.createElement('button');
    closeBtnEl.classList.add('btn', 'remove');
    closeBtnEl.innerHTML = `
        <span class="material-symbols-outlined">
            close
        </span>`;

    closeBtnEl.addEventListener('click', () => {
      this.el.remove();
    });
    this.el.addEventListener('click', () => {
      this.el.remove();
    });

    // append
    containerEl.append(infoEl, saveBtnEl, closeBtnEl);
    this.el.append(containerEl);
  }
}
