import {
  query,
  collection,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import { db } from '../firebase/data.js';
import CardItem from './CardItem.js';
import Empty from './Empty.js';

export default class CardList {
  constructor() {
    this.el = document.createElement('ul');
    this.data = [];
    this.render();

    onSnapshot(query(collection(db, 'member')), (snapshot) => {
      this.data = [];
      snapshot.forEach((element) => {
        this.data.push({ data: element.data(), id: element.id });
      });
      this.render();
    });
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
}
