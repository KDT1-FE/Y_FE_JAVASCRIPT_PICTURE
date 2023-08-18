import { createEmployee, updateEmployee, uploadImg } from "../../api/api";
import Component from "../../core/Component";
import validation from "../../util/validation";

export default class SubmitBtn extends Component {
  constructor() {
    super({
      tagName: "button"
    })
    this.el.classList.add("submit-button")
  }
  render() {
    this.el.innerText = "등록"
    this.el.addEventListener("click", async () => {
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const team = document.getElementById("team").value
      const job = document.getElementById("job").value
      const position = document.getElementById("position").value
      const img = document.getElementById("img").value

      const data = {
        name: name,
        email: email,
        team: team,
        job: job,
        position: position,
        img: img
      }
      const [hash, queryString = ''] = location.hash.split('?')
      if(validation(data)) {
        const imgKey = await uploadImg()
        data.img = imgKey
                
        if (hash === "#/create") await createEmployee(data)
        if (hash === "#/update") await updateEmployee(data)

        window.location = "#/"
      } else {
        alert("빈칸을 입력해 주세요.")        
      }
    })
  }
}