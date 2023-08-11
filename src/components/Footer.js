export default class Footer {
  constructor() {
    this.el = document.createElement('footer');
    this.render();
  }

  render() {
    this.el.innerHTML = `
    <a class="github" href="https://github.com/noSPkeepgoing">
      Gitbub
      <span class="material-symbols-outlined">
        arrow_outward
      </span>
      </a>
    <p class="copyright">${new Date().getFullYear()} &copySunpaaaa</p>
    `;
  }
}
