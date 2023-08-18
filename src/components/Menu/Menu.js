import Component from "../../core/Component";
import CreateBtn from "./CreateBtn"

export default class Menu extends Component {
  constructor() {
    super() 
    this.el.classList.add("buttonDiv")
  }
  render() {
    const createBtn = new CreateBtn()
    this.el.append(createBtn.el)
  }
}