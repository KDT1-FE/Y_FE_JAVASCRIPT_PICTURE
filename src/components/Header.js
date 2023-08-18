import Modal from './Modal.js';

export default class Header {
  constructor() {
    this.el = document.createElement('header');
    this.isDark = false;
    this.isWide = false;
    this.render();
  }
  render() {
    // Header top
    const titleEl = document.createElement('h1');
    titleEl.classList.add('title');
    titleEl.innerText = '회원관리 시스템';

    const btnsEl = document.createElement('div');
    btnsEl.classList.add('btns');

    const toggleModeBtnEl = document.createElement('button');
    toggleModeBtnEl.classList.add('btn', 'toggle', 'material-symbols-outlined');
    toggleModeBtnEl.innerText = `${this.isDark ? 'dark_mode' : 'light_mode'} `;

    const addBtnEl = document.createElement('button');
    addBtnEl.classList.add('btn', 'add');
    addBtnEl.innerText = '새로운 멤버 추가';

    btnsEl.append(toggleModeBtnEl, addBtnEl);

    const topEl = document.createElement('div');
    topEl.classList.add('top');
    topEl.append(titleEl, btnsEl);

    // Event
    toggleModeBtnEl.addEventListener('click', () => {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.setAttribute('color-theme', 'dark');
      } else {
        document.documentElement.setAttribute('color-theme', 'light');
      }
      this.el.innerHTML = '';
      this.render();
    });

    addBtnEl.addEventListener('click', () => {
      const body = document.querySelector('body');
      const modal = new Modal({}, 'create');
      body.append(modal.el);
    });

    this.el.append(topEl);
  }
}
