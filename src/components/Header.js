import { Component } from "../core/core";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <h1>헤더입니다.</h1>
    `;
  }
}
