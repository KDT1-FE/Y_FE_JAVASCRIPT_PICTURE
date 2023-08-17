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
    this.el.classList.add('cropper-container')
    this.el.innerHTML = /* html */`
      <div class="cropper-inner-container">
        <img id="image${name}" >
      </div>
      <button type="button" class="btn btn-crop"> 이미지 확정</button>
    `
    
    const image = this.el.querySelector(`#image${name}`)

    let cropper 
    image.style.display = 'block'
    image.style.maxWidth = '100%'

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
    
    if(file){
      filereader.readAsDataURL(file)
    }else if(src){
      image.src = src
      cropper = new Cropper(image, {
        aspectRatio
      })
      cropper.clear()
      cropper.crop()
    }

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
  }
}