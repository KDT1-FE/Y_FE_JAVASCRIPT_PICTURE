import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Detail');
  }

  async getHtml() {
    return `
        `;
  }
}
