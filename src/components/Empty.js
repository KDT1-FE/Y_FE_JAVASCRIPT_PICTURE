export default class Empty {
  constructor() {
    this.el = document.createElement('div');
    this.render();
  }

  render() {
    this.el.classList.add('empty');
    this.el.innerHTML = `
            <h3 class="empty_text">새로운 멤버를 추가해보세요!</h3>
        `;
  }
}
