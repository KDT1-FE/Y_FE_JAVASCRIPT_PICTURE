import { Component } from '../core/core'
import Cropper from 'cropperjs'
import cropperStore from '../store/cropper'

export default class Cropper extends Component{
  constructor(props){
    super({
      props
    })
    cropperStore.subscribe(`${this.props.name}File`,()=>{
      this.render()
    })
  }
  render(){
    const { aspectRatio, name, src } = this.props

    this.el.innerHTML = /* html */`
      <div class="cropper-inner-container">
        <img id="image${name}" >
      </div>
      <button type="button" class="btn btn-crop"> ${name==='thumbnail'?'썸네일':'이미지'} 확정</button>
    `
    
    const image = this.el.querySelector(`#image${name}`)

    let cropper 
    
    const filereader = new FileReader()
    filereader.addEventListener('load',e=>{
      image.src = e.target.result
      cropper = new Cropper(image, {
        aspectRatio
      })
      cropper.clear()
      cropper.crop()
    })
    const file = cropperStore.state[`${name}File`]
    
    // img src를 입력 경우 두가지
    // 1. store에 저장된 file을 불러와서 Cropper 인스턴스 생성 - DialogAdd 의 form에 사진을 Crop(잘라낼) 경우 store.state.${name}file에 저장됨 이 파일을 읽어내서(readAsDataURL) 이미지 src를 만들어넴
    if(file){
      filereader.readAsDataURL(file)
    }else if(src){
    // 2. props로 넘겨받은 src를 받아 Cropper 인스턴스 생성 - DialogEdit 의 Dialog를 열 시에 기본 사진을 Props로 넘겨 받아와서 Cropper를 생성
      image.src = src
      cropper = new Cropper(image, {
        aspectRatio
      })
      cropper.clear()
      cropper.crop()
    }

    // 만들어진 이미지에 Crop 버튼을 눌러 사진을 자른 후(캔버스 타입) Blob 형태로 변경 후 Store에 저장함
    const cropBtnEl = this.el.querySelector('.btn-crop')
    cropBtnEl.addEventListener('click',()=>{
      const {x,y,width,height} = cropper.getData({rounded : true})
      const canvas = cropper.getCroppedCanvas({
          width,
          height,
          x,
          y,
          fillColor:'white'
        })
      canvas.toBlob(
        (blob)=>{
          console.log(`${name}Blob is `,blob)
          cropperStore.state[`${name}Blob`] = blob
        }
      )
    })
    // Cropperjs 의 기본 값
    image.style.display = 'block'
    image.style.maxWidth = '100%'

  }
}