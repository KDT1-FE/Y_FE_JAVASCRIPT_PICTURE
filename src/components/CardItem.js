import Modal from './Modal.js';

export default class CardItem {
  constructor(info = {}) {
    this.el = document.createElement('li');
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
    const { photo, name, email, phone, department } = this.info;

    this.el.classList.add('card');
    this.el.innerHTML = `
        <p class="card_photo"><img src=${
          photo
            ? photo
            : 'https://firebasestorage.googleapis.com/v0/b/wanna-go-home-9ebdc.appspot.com/o/empty_user.png?alt=media&token=507c8fc6-6407-4c4f-8627-fe33ed36539f'
        } /></p>
        <div class="card_info">
            <p class="info_name">${name}</p>
            <p class="info_phone">${phone}</p>
            <p class="info_email">${email}</p>
            <p class="info_department">${department}</p>
        </div>
    `;

    this.el.addEventListener('click', () => {
      const body = document.querySelector('body');
      const modal = new Modal(this.info);
      body.append(modal.el);
    });
  }
}
