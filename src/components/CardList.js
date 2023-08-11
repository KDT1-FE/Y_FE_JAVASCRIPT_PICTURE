import { querySnapshot } from '../firebase/data.js';
import CardItem from './CardItem.js';

export default class CardList {
  constructor() {
    this.el = document.createElement('ul');
    this.render();
  }
  render() {
    setData();
    this.el.classList.add('cards');
    this.el.append(...data.map((person) => new CardItem(person).el));
  }
}

const data = [];
const setData = () => {
  querySnapshot.forEach((element) => {
    data.push(element.data());
  });
};
