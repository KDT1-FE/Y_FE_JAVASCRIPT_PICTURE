import Component from "../../core/Component"
import { deleteEmployee } from "../../api/api"

export default class DeleteBtn extends Component {
  constructor(props) {
    super({
      tagName: "button",
      props: props
    })
    this.el.classList.add("delete-button")
  }
  render() {
    this.el.innerText = "삭제"
    this.el.addEventListener("click", async () => {
      await deleteEmployee(this.props)
      window.location = "#/"
    })
  }
} 