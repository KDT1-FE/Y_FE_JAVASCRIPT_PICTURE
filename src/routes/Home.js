import { Component } from '../core/index.js';
import Store from '../store/userState.js';
import AddMember from '../components/AddMember.js';
import FindTeam from '../components/FindTeam.js';
import FindMember from '../components/FindMember.js';
import Identity from '../components/Identity.js';

export default class Home extends Component {
    constructor() {
        super();
        Store.subscribe('member', () => {
            this.render();
        });
    }
    render() {
        const AddMemberEl = new AddMember().el;
        const FindTeamEl = new FindTeam().el;
        const FindMemberEl = new FindMember().el;
        const IdentityEl = new Identity().el;

        this.el.innerHTML = /*html*/ `
            <div class="header__banner">
                <h1 class="header__banner--title">나만의 <span></span>을 찾아보세요</h1>
                <p class="header__banner--description">
                    팀원을 모집하거나, 팀에 참여하세요<br />
                    1분만에 당신에게 맞는 최적의 조건을 가진 팀을 검색해서 팀을
                    구성해보세요!!
                </p>
                <button class="header__modal--button btn btn-primary">정보 등록하기</button>
                <div class="modal__container">
                    <div class="modal__wrapper">
                        <div class="modal__header">
                            <p>사진과 개인 정보를 입력하세요</p>
                            <button class = "modal__close">X</button>
                        </div>
                        <div class="modal__content"></div>
                    </div>
                </div>
            </div>
            `;

        this.el.classList.add('home__container');

        const modal = this.el.querySelector('.header__modal--button');
        const modalClose = this.el.querySelector('.modal__close');
        const modalContainer = this.el.querySelector('.modal__container');
        const modalContent = this.el.querySelector('.modal__content');

        modal.addEventListener('click', () => {
            modalContainer.classList.add('modal__active');
            modalContent.append(AddMemberEl);
        });

        modalClose.addEventListener('click', () => {
            modalContainer.classList.remove('modal__active');
        });

        if (Store.state.member) {
            this.el.querySelector('.header__banner--title span').textContent =
                '팀원';
        } else {
            this.el.querySelector('.header__banner--title span').textContent =
                '팀';
        }

        this.el.append(FindMemberEl);
        this.el.append(FindTeamEl);
        this.el.append(IdentityEl);
    }
}
