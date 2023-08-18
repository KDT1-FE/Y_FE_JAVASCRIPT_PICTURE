import Component from "../../core/Component"

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header"
    })
    this.el.classList.add("header")
  }
  render() {
    this.el.innerHTML = /* html */`
      <a href="#/">
        <h1 class="header-title">EMS</h1>
        Employee Management Service
      </a>
    `
  }
}