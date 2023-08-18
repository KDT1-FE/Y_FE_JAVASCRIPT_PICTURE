import Component from "../../core/Component";

export default class CreateButton extends Component {
  constructor() {
    super({
      tagName: "button"
    })
  }
  render() {
    this.el.classList.add("create-button")
    this.el.innerText = "임직원 생성"
    this.el.addEventListener("click", () => {
      location.href = '#/create'
    })
  }
}