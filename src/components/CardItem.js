import Modal from './Modal.js';
import { deleteData, setData } from '../firebase/data.js';
import CardList from './CardList.js';
import { cardList } from '../main.js';

export default class CardItem {
  constructor(info = {}) {
    this.el = document.createElement('li');
    this.id = info.id;
    this.info = {
      photo: info.data.photo,
      name: info.data.name,
      email: info.data.email,
      phone: info.data.phone,
      department: info.data.department,
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
      const modal = new Modal(this.info, 'update', this.id);
      body.append(modal.el);
    });

    // 카드 삭제
    const deleteBtnEl = document.createElement('button');
    deleteBtnEl.classList.add('btn', 'delete');
    deleteBtnEl.innerHTML = `
        <span class="material-symbols-outlined">
            close
        </span>`;

    deleteBtnEl.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`${name}을 정말 삭제하시겠어요?`)) {
        deleteData(this.id);
        const newData = await setNewData();
        cardList.update(newData);
      }
    });

    this.el.append(deleteBtnEl);
  }
}

const setNewData = async () => {
  const newData = [];
  await setData().then((res) => {
    res.forEach((el) => newData.push(el));
  });
  return newData;
};
