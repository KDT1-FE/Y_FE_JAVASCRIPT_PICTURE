import Modal from './Modal.js';
import { cardList, category } from '../main.js';
import { searchData } from '../firebase/data.js';

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
    titleEl.innerText = '멤버 관리 시스템';

    const btnsEl = document.createElement('div');
    btnsEl.classList.add('btns');

    const toggleModeBtnEl = document.createElement('button');
    toggleModeBtnEl.classList.add('btn', 'toggle', 'material-symbols-outlined');
    toggleModeBtnEl.innerText = `${this.isDark ? 'dark_mode' : 'light_mode'} `;

    const searchBtnEl = document.createElement('button');
    searchBtnEl.classList.add('btn', 'search', 'material-symbols-outlined');
    searchBtnEl.innerText = 'search';

    const addBtnEl = document.createElement('button');
    addBtnEl.classList.add('btn', 'add');
    addBtnEl.innerText = '새 멤버 추가';

    btnsEl.append(toggleModeBtnEl, searchBtnEl, addBtnEl);

    const topEl = document.createElement('div');
    topEl.classList.add('top');
    topEl.append(titleEl, btnsEl);

    const bottomEl = document.createElement('form');
    bottomEl.classList.add('bottom', 'hide');
    const searchInputEl = document.createElement('input');
    searchInputEl.placeholder = '이름으로 검색해주세요.';
    bottomEl.append(searchInputEl);

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

    searchBtnEl.addEventListener('click', () => {
      bottomEl.classList.toggle('hide');
    });

    addBtnEl.addEventListener('click', () => {
      const body = document.querySelector('body');
      const modal = new Modal({}, 'create');
      body.append(modal.el);
    });

    bottomEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyword = searchInputEl.value.trim();

      if (keyword === '') {
        alert('검색어를 입력해주세요!');
        return;
      }
      // cardList 업데이트
      const searched = await searchData(keyword);
      localStorage.setItem('search-keyword', keyword);
      searchInputEl.value = '';
      cardList.update(searched);

      // 카테고리 이동
      const category = document.querySelector('.category .search_btn');
      category.click();
    });

    this.el.append(topEl, bottomEl);
  }
}
