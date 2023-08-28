import { Component } from '../core';

export default class ViewMember extends Component {
    constructor(props) {
        super({
            props,
            tagName: 'a',
        });
    }
    render() {
        const { id } = this.props;
        const { data } = this.props;
        const { nickname, name, address, city, province, additional, url } = data;
        this.el.innerHTML = /*html*/ `
            
            <div class="view__banner--item">
                <div class="view__banner--item-left">
                    <div class="view__banner--name"><strong>${nickname}</strong>님의<br/> ${name}포인트📌</div>
                    <div class="view__banner--information">
                        <div class="view__banner--location">${province} ${city}</div>
                        <div class="view__banner--additional">${additional}</div>
                    </div>
                    <a class="view__banner--address" href=${address} target="_blank">주소 확인해볼까요?</a>
                </div>
                <div class="view__banner--image-container">
                </div>
            </div>
        `;
        this.el.classList.add('view__banner--item-container');
        const imageElement = this.el.querySelector('.view__banner--image-container');
        imageElement.style.backgroundImage = `url(${url})`;

        this.el.addEventListener('click', () => {
            location.href = `/#/about?id=${id}`;
        });
    }
}
