export default class Footer {
  constructor() {
    this.el = document.createElement('footer');
    this.render();
  }

  render() {
    this.el.innerText = 'this is footer';
  }
}
