import { Store } from '../core/index.js';

//image store
const store = new Store({
    nickname: '',
    name: '',
    src: '',
    province: '',
    city: '',
    address: '',
    additional: '',
    file: null,
    url: '',
});

export default store;
