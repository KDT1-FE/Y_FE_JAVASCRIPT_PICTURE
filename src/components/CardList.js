import CardItem from './CardItem.js';
import Empty from './Empty.js';

export default class CardList {
  constructor(data) {
    this.el = document.createElement('ul');
    this.data = data;
    this.render();
  }

  render() {
    this.el.classList.add('cards');
    this.el.innerHTML = '';
    if (this.data.length == 0) {
      this.el.append(new Empty().el);
    } else {
      this.el.append(...this.data.map((item) => new CardItem(item).el));
    }
  }

  update(data) {
    this.data = data;
    this.render();
  }
}
