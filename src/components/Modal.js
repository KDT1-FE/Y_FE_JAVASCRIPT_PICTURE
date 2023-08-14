import { uploadImage } from '../firebase/data.js';

export default class Modal {
  constructor(info = {}) {
    this.el = document.createElement('div');
    this.info = {
      photo: info.photo,
      name: info.name,
      email: info.email,
      phone: info.phone,
      department: info.department,
    };
    this.render();
  }

  render() {
    this.el.classList.add('modal');
    const containerEl = document.createElement('div');
    containerEl.classList.add('modal_container');
    containerEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const { name, photo, email, phone, department } = this.info;

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
    inputNameEl.value = name;
    const inputEmailEl = document.createElement('input');
    inputEmailEl.value = email;
    const inputPhoneEl = document.createElement('input');
    inputPhoneEl.value = phone;
    const inputDepartmentEl = document.createElement('input');
    inputDepartmentEl.value = department;

    infoTxtEl.append(
      inputNameEl,
      inputPhoneEl,
      inputEmailEl,
      inputDepartmentEl
    );
    infoEl.append(infoImgEl, infoTxtEl);

    // update
    const updateBtnEl = document.createElement('button');
    updateBtnEl.classList.add('btn', 'update');
    updateBtnEl.innerText = '저장';

    // modal remove
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
    containerEl.append(infoEl, updateBtnEl, closeBtnEl);
    this.el.append(containerEl);
  }
}
