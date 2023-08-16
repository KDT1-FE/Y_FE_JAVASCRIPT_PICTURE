import { createData } from '../firebase/data.js';

export default class SaveButton {
  constructor(type) {
    this.el = document.createElement('button');
    this.type = type;
    this.render();
  }
  render() {
    this.el.classList.add('btn', 'save', this.type);
    this.el.innerText = '저장';

    if (this.el.classList.contains('create')) {
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

        const modal = document.querySelector('.modal');
        modal.remove();
      });
    }
  }
}
