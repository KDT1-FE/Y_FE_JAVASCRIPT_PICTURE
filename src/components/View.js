import { Component } from '../core';
import { getCollection } from '../dispatch/index';

import valleyList from '../store/valleyList';
import searchState from '../store/SearchState';

import ViewMember from './ViewMember';

export default class View extends Component {
    constructor() {
        super();
    }
    render() {
        this.el.innerHTML = /*html*/ `
                <div class="view__banner--top">
                    <div class="view__banner--description">
                        <p>계곡 포인트에 대해서 검색해보세요</p>
                    </div>
                    <div class="view__banner--search-container">
                        <input class="view__banner--search" type="text" placeholder="검색어를 입력하세요"/>
                        <button class="view__banner--search-btn">Search</button>
                    </div>
                </div>
                <div class="view__banner--wrapper"></div>
        `;
        this.el.classList.add('view__banner--container');

        const printValley = async () => {
            await getCollection();
            this.el.querySelector('.view__banner--wrapper').append(
                // store에 있는 데이터는 배열이므로 map을 사용하여 각각의 데이터를 ViewMember에 넘겨준다.
                ...valleyList.state.valleyList.map((valley) => {
                    return new ViewMember(valley).el;
                })
            );
        };

        if (!searchState.state.searched) {
            printValley();
        }

        const searchBtn = this.el.querySelector('.view__banner--search-btn');
        const searchInput = this.el.querySelector('.view__banner--search');

        const searchValley = async () => {
            this.el.querySelector('.view__banner--wrapper').innerHTML = '';
            await getCollection();
            this.el.querySelector('.view__banner--wrapper').append(
                ...valleyList.state.valleyList
                    .filter((valley) => {
                        if (Object.values(Object.values(valley.data)).join('').includes(searchInput.value)) {
                            return valley;
                        }
                    })
                    .map((valley) => {
                        return new ViewMember(valley).el;
                    })
            );
        };

        searchBtn.addEventListener('click', () => {
            searchValley();
        });

        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchValley();
            }
        });
    }
}
