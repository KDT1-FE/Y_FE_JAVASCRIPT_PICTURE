import Component from "../../core/Component";
import { getEmployee, getImgUrl } from "../../api/api";

export default class ImageContainer extends Component {
  constructor() {
    super()
    this.el.classList.add("input-row")
  }
  async render() {
    const input = document.createElement("input")
    const preview = document.createElement("img")

    input.id = "img"
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")

    input.classList.add("fileinput")
    preview.classList.add("preview")

    input.addEventListener('change', () => {
      const reader = new FileReader() 
      reader.onload = ({ target }) => {
        preview.src = target.result
      }
      reader.readAsDataURL(input.files[0])
    })

    this.el.append(input, preview)

    // 수정일 경우 img에 데이터 입력
    const [hash, queryString = ''] = location.hash.split('?')
    if (hash === "#/update") {
      const id = queryString.split("=")[1]
      const data = await getEmployee(id)
      const { img } = data.data.getUser

      const s3ImgUrl = await getImgUrl(img)
      preview.src = s3ImgUrl

      const imgFile = await fetch(s3ImgUrl)
      const imgData = await imgFile.blob()
      const ext = s3ImgUrl.split(".").pop()
      const filename = s3ImgUrl.split("/").pop() 
      const metadata = { type: `image/${ext}` }
      const newImg =  new File([imgData], filename, metadata)
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(newImg)
      input.files = dataTransfer.files
    }
  }
}