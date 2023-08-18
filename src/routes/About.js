import { Component } from '../core/index.js';

<<<<<<< HEAD
import Store from '../store/myValley.js';
import Involve from '../store/involvedValley.js';

import DetailMyValley from '../components/DetailMyValley.js';
import ViewMember from '../components/ViewMember.js';

import { getInvolvedData } from '../dispatch/index.js';
import { getData } from '../dispatch/index.js';
import { uniqBy } from 'lodash';

export default class About extends Component {
    render() {
        const detailMyValleyel = new DetailMyValley().el;
        this.el.innerHTML = /*html*/ `
            <div class="about__banner--wrapper"></div>
            <div class="about__banner--helper">✨연관 계곡들 보기✨</div>
            <div class="view__banner--wrapper"></div>
        `;
        this.el.classList.add('about__banner--container');

        const getInvolvedDatas = async () => {
            Involve.state.valleyList = [];
            const _id = history.state.id;
            await getInvolvedData(_id, 'name', Store.state.name);
            await getInvolvedData(_id, 'nickname', Store.state.nickname);
            await getInvolvedData(_id, 'province', Store.state.province);
            await getInvolvedData(_id, 'city', Store.state.city);

            console.log('hello');
        };

        const inputEl = this.el.querySelector('.view__banner--wrapper');
        const historyIsValid = async () => {
            const query = history.state.id;
            await getData(query);
            this.el.querySelector('.about__banner--wrapper').append(detailMyValleyel);
            await getInvolvedDatas();
            const newArr = [...Involve.state.valleyList];
            Involve.state.valleyList = uniqBy(newArr, 'id');
            inputEl.append(...Involve.state.valleyList.map((valley) => new ViewMember(valley).el));
        };

        if (history.state.id !== undefined) {
            historyIsValid();
        } else {
            alert('잘못된 접근입니다.');
        }
=======
export default class About extends Component {
    render() {
        const { a, b } = history.state;
        this.el.innerHTML = /*html*/ `
                <h1>About</h1>
                <p>About 화면입니다.</p>
                <p>a: ${a}</p>
                <p>b: ${b}</p>
                `;
>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55
    }
}
