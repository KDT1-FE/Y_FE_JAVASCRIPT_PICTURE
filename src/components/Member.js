import { Component } from '../core/component';
import { memberStore } from '../store/memberStore';

export default class Member extends Component {
  constructor(props) {
    super({ props, tagName: 'a', attributes: { class: 'member' } });
  }
  render() {
    const { member } = this.props;

    this.componentRoot.setAttribute('href', `/#/detail?id=${member.id}`);
    this.componentRoot.innerHTML =
      /* html */
      `
      <div class="row-member">  <div class='checkbox-container'>
      <input class='checkbox' type='checkbox'></input>
    </div>
    <p class='photo' style="background-image: url(${member.photoUrl})"></p>
    <p class="name-title">${member.name}</p>
    <p class="email-title">${member.email}</p></div>
    `;

    const checkBox = this.componentRoot.querySelector('.checkbox');
    checkBox.addEventListener('change', (event) => {
      if (event.currentTarget.checked) {
        memberStore.state.deleteMembers.push({
          id: member.id,
          photoUrl: member.photoUrl,
        });
      }
    });
  }
}
