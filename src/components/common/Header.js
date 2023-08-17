import { Component } from "../../core/core";
import logoImage from "../../asset/images/logo.jpg";

export default class Header extends Component {
  render() {
    this.el.classList.add("header-container");
    this.el.innerHTML = /* html */ `
      <header class="header">
        <nav class="header-item-box">
          <div class="header-item-box-logo">
            <img src=${logoImage} alt="logo"/>
          </div>
        </nav>
      </header>
    `;

    const headerLogoEl = this.el.querySelector(".header-item-box-logo");
    headerLogoEl.addEventListener("click", () => {
      location.href = "/#/home";
    });
  }
}
