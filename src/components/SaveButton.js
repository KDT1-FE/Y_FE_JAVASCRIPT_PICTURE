import { createData, updateData } from '../firebase/data.js';

export default class SaveButton {
  constructor(type, id) {
    this.el = document.createElement('button');
    this.type = type;
    this.id = id;
    this.render();
  }
  render() {
    this.el.classList.add('btn', 'save', this.type);
    this.el.innerText = '저장';

    if (this.type === 'create') {
      this.el.addEventListener('click', () => {
        const newInfo = {};
        // image
        const infoImg = document.querySelector('.info_img img');
        newInfo['photo'] = infoImg.src;

        // text
        const infoTxt = document.querySelectorAll('.info_txt input');
        infoTxt.forEach((input) => {
          newInfo[input.name] = input.value;
        });

        createData(newInfo);
      });
    }

    if (this.type === 'update') {
      this.el.addEventListener('click', () => {
        const newInfo = {};
        // image
        const infoImg = document.querySelector('.info_img img');
        newInfo['photo'] = infoImg.src;

        // text
        const infoTxt = document.querySelectorAll('.info_txt input');
        infoTxt.forEach((input) => {
          newInfo[input.name] = input.value;
        });
        updateData(this.id, newInfo);
      });
    }
  }
}
