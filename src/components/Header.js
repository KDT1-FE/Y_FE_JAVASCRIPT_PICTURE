import Modal from './Modal.js';
import SaveButton from './SaveButton.js';

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

    const searchBtnEl = document.createElement('button');
    searchBtnEl.classList.add('btn', 'search', 'material-symbols-outlined');
    searchBtnEl.innerText = `search`;

    const addBtnEl = document.createElement('button');
    addBtnEl.classList.add('btn', 'add');
    addBtnEl.innerText = '새로운 멤버 추가';

    btnsEl.append(toggleModeBtnEl, searchBtnEl, addBtnEl);

    const topEl = document.createElement('div');
    topEl.classList.add('top');
    topEl.append(titleEl, btnsEl);

    // Header bottom
    const bottomEl = document.createElement('div');
    bottomEl.classList.add('bottom', 'hide');

    const searchInputEl = document.createElement('input');
    searchInputEl.classList.add('input');
    searchInputEl.setAttribute('placeholder', '검색어를 입력하세요.');
    bottomEl.append(searchInputEl);

    // Event
    toggleModeBtnEl.addEventListener('click', () => {
      this.isDark = !this.isDark;
      this.el.innerHTML = '';
      this.render();
    });

    searchBtnEl.addEventListener('click', () => {
      bottomEl.classList.toggle('hide');
    });

    addBtnEl.addEventListener('click', () => {
      const body = document.querySelector('body');
      const modal = new Modal({}, 'create');
      body.append(modal.el);
    });

    this.el.append(topEl, bottomEl);
  }
}
