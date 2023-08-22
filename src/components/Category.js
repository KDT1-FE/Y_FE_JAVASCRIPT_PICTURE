import { filteredData, searchData, setData } from '../firebase/data.js';
import { cardList } from '../main.js';

export default class Category {
  constructor(category = 'ALL') {
    this.el = document.createElement('div');
    this.category = category;
    this.render();
  }

  render() {
    this.el.classList.add('category');

    const categoryBtnEl = document.createElement('button');
    categoryBtnEl.classList.add('btn', 'category_btn', 'active');
    categoryBtnEl.innerText = this.category;

    const dropDownEl = document.createElement('div');
    dropDownEl.classList.add('dropdown');
    const selectedEl = document.createElement('div');
    selectedEl.classList.add('selected');
    selectedEl.innerHTML = `
    ${this.category} 
    <span class="material-symbols-outlined">
    arrow_drop_down
    </span>`;
    const optionsEl = document.createElement('ul');
    optionsEl.classList.add('options', 'hide');
    optionsEl.innerHTML = `
    <li>ALL</li>
    <li>FE</li>
    <li>BE</li>
    <li>PM</li>
    `;

    const searchBtnEl = document.createElement('button');
    searchBtnEl.classList.add('btn', 'search_btn');
    searchBtnEl.innerText = '검색결과';

    // event
    selectedEl.addEventListener('click', () => {
      optionsEl.classList.toggle('hide');
    });

    optionsEl.addEventListener('click', (e) => {
      const selected = e.target.innerText;
      this.update(selected);
    });

    categoryBtnEl.addEventListener('click', (e) => {
      const selected = e.target.innerText;
      this.update(selected);
      searchBtnEl.classList.remove('active');
      categoryBtnEl.classList.add('active');
      dropDownEl.classList.remove('hide');
    });

    searchBtnEl.addEventListener('click', async () => {
      categoryBtnEl.classList.remove('active');
      searchBtnEl.classList.add('active');
      dropDownEl.classList.add('hide');
      const keyword = localStorage.getItem('search-keyword');
      const rememberData = await searchData(keyword);
      cardList.update(rememberData);
    });

    //append
    dropDownEl.append(selectedEl, optionsEl);
    this.el.append(categoryBtnEl, searchBtnEl, dropDownEl);
  }

  async update(category = this.category) {
    const data = await filteredList(category);
    cardList.update(data);
    this.category = category;
    this.el.innerHTML = '';
    this.render();
  }
}

const filteredList = async (department) => {
  const data = [];
  if (department === 'ALL') {
    await setData().then((res) => {
      res.forEach((el) => data.push(el));
    });
  } else {
    await filteredData(department).then((res) => {
      res.forEach((el) => data.push(el));
    });
  }
  return data;
};

const selectCategory = () => {};
