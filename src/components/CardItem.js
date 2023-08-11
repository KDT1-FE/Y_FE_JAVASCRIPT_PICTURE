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
    const {
      photo = 'https://firebasestorage.googleapis.com/v0/b/wanna-go-home-9ebdc.appspot.com/o/empty_user.png?alt=media&token=269a1197-1c01-48cc-a732-0758e6677c6a',
      name,
      email,
      phone,
      department,
    } = this.info;

    this.el.classList.add('card');
    this.el.innerHTML = `
        <p class="card_photo"><img src=${photo} /></p>
        <div class="card_info">
            <p class="info_name">${name}</p>
            <p class="info_phone">${phone}</p>
            <p class="info_email">${email}</p>
            <p class="info_department">${department}</p>
        </div>
    `;
  }
}
