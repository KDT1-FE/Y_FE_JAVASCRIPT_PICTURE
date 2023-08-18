import Component from "../../core/Component"
import UpdateBtn from "./UpdateBtn"
import DeleteBtn from "./DeleteBtn"
import { getImgUrl } from "../../api/api"

export default class Employee extends Component {
  constructor(props) {
    super({
      props: props
    })
    this.el.classList.add("employee")
  }
  async render() {
    const s3ImgUrl = await getImgUrl(this.props.img)

    this.el.innerHTML = /* html */`
      <img class="employee--img" src="${s3ImgUrl}" />
      <div class="employee--info">
        <span>${this.props.team}<span>
        <div>
          <span>${this.props.name}<span>
          <span>${this.props.position}<span>
        </div>
      </div>
    `
    const updateBtn = new UpdateBtn(this.props.id)
    const deleteBtn = new DeleteBtn(this.props.id)
    this.el.append(updateBtn.el, deleteBtn.el)
  }
}