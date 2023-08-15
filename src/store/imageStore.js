import { Store } from '../core/index.js';
import db from '../core/Firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

//image store
const store = new Store({
    src: '',
    name: '',
    department: '',
    year: '',
    career: '',
    introduce: '',
    portfolio: '',
    records: '',
});

export default store;
