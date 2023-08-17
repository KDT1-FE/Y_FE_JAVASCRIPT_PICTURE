import {
  query,
  collection,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import CardItem from './CardItem.js';
import { db } from '../firebase/data.js';

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
    this.el.append(...this.data.map((item) => new CardItem(item).el));
  }
}
