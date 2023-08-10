export default class Header {
  constructor() {
    this.el = document.createElement('header');
    this.render();
  }
  render() {
    this.el.innerText = 'this is header';
  }
}
