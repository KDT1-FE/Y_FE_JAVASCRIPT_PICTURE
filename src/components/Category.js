export default class Category {
  constructor(category) {
    this.el = document.createElement('div');
    this.category = category;
    this.render();
  }

  render() {
    const allBtnEl = document.createElement('button');
    allBtnEl.classList.add('btn', 'all');
    allBtnEl.innerText = 'ALL';
    const feBtnEl = document.createElement('button');
    feBtnEl.classList.add('btn', 'fe');
    feBtnEl.innerText = 'FE';
    const beBtnEl = document.createElement('button');
    beBtnEl.classList.add('btn', 'be');
    beBtnEl.innerText = 'BE';
    const pmBtnEl = document.createElement('button');
    pmBtnEl.classList.add('btn', 'pm');
    pmBtnEl.innerText = 'PM';

    this.el.append(allBtnEl, feBtnEl, beBtnEl, pmBtnEl);
  }
}
