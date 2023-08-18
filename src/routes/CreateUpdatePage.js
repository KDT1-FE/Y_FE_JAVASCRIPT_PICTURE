import { getEmployee, getImgUrl } from "../api/api"
import CancelBtn from "../components/CreatePage/CancelBtn"
import ImageContainer from "../components/CreatePage/ImageContainer"
import SubmitBtn from "../components/CreatePage/SubmitBtn"
import Component from "../core/Component"

export default class CreateUpdatePage extends Component {
  async render() {
    this.el.classList.add("create-update-page")
    this.el.innerHTML = /* html */`
      <div class="input-row">
        <div>이름<input id="name"/></div>
        <div>이메일<input id="email"/></div>
      </div>
      <div class="input-row">
        <div>부서<input id="team"/></div>
        <div>직급<input id="job"/></div>
      </div>
      <div class="input-row">
        <div>직책<input id="position"/></div>
      </div>
    `

    const imageContainer = new ImageContainer()
    const buttonDiv = document.createElement("div")
    const submitBtn = new SubmitBtn()
    const cancelBtn = new CancelBtn()
    buttonDiv.append(submitBtn.el, cancelBtn.el)
    this.el.append(imageContainer.el, buttonDiv)

    // 수정일 경우 input에 데이터 입력
    const [hash, queryString = ''] = location.hash.split('?')
    if (hash === "#/update") {
      const id = queryString.split("=")[1]
      const data = await getEmployee(id)
      const {name, email, team, job, img, position} = data.data.getUser

      document.getElementById("name").value = name
      document.getElementById("email").value = email
      document.getElementById("team").value = team
      document.getElementById("job").value = job
      document.getElementById("position").value = position
    }
  }
}