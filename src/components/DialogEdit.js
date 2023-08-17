import { Component } from "../core/core";
import { storage, getDownloadURL, uploadBytes , ref } from "../../firebase"
import store from '../store/champion'
import Loader from './Loader'
import Cropper from "./Cropper";
import cropperStore from'../store/cropper'

export default class Dialog extends Component{
  constructor(props = {
    name:'',
    nickname:'',
    thumbnail:'',
    image:'',
    region:'',
    role:'',
    position:''}){
    super({
      props
    })
  }
  render(){
    const champion = this.props
    this.el.innerHTML = /*html */`
    <dialog class="modal modal-edit">
      <button class="btn btn-close"><span>X</span></button>
      <form> 
        <div class="form-basic"><div>이름 </div><input class="form-name" placeholder="이름" value="${champion.name}"/></div>
        <div class="form-basic"><div>별명 </div><input class="form-nickname" placeholder="별명" value="${champion.nickname}"/> </div>
        <div class="select-field">
          <select class="form-region">
            <option>국가 / 지역</option>
            <option>공허</option>
            <option>그림자 군도</option>
            <option>녹서스</option>
            <option>데마시아</option>
            <option>룬테라</option>
            <option>밴틀 시티</option>
            <option>빌지워터</option>
            <option>슈리마</option>
            <option>아이오니아</option>
            <option>이쉬탈</option>
            <option>자운</option>
            <option>프렐요드</option>
            <option>필트오버</option>
          </select>
          <div class="select-arrow"></div>
        </div>
        <div class="select-field">
          <select class="form-role">
            <option>역할</option>
            <option>마법사</option>
            <option>서포터</option>
            <option>암살자</option>
            <option>원거리</option>
            <option>전사</option>
            <option>탱커</option>
          </select>
          <div class="select_arrow"></div>
        </div>
        <div class="select-field">
          <select class="form-position">
            <option>포지션</option>
            <option>탑</option>
            <option>정글</option>
            <option>미드</option>
            <option>바텀</option>
            <option>서폿</option>
          </select>
          <div class="select_arrow"></div>
        </div>
        
        <div class="form-basic"><div>썸네일이미지 </div><input class="form-thumbnail" placeholder="썸네일 이미지" type="file" accept="image/*"></div>
        <div class="cropper-thumb"></div>
        <div class="form-basic"><div> 배경이미지 </div><input class="form-image" placeholder="배경 이미지" type="file" accept="image/*"></div>
        <div class="cropper-image"></div>

        <button class="btn btn-edit-confirm"><span>수정</span></button>
      </form>
    </dialog>
    `

    const modal = this.el.querySelector('dialog')
    const localStorageArray = JSON.parse(localStorage.getItem('champ'))['char']
    const regionFormEl = this.el.querySelector('.form-region')
    const roleFormEl = this.el.querySelector('.form-role')
    const positionFormEl = this.el.querySelector('.form-position')
    let isSubmit = false
    const idx = localStorageArray.findIndex(obj=> obj.name === champion.name) 
    const obj = localStorageArray[idx]
    const formEl = this.el.querySelector('form')
    const cropperThumbEl = this.el.querySelector('.cropper-thumb')
    const cropperImageEl = this.el.querySelector('.cropper-image')
    const formThumbEl = this.el.querySelector('.form-thumbnail')
    const formImageEl = this.el.querySelector('.form-image')
    
    modal.append(new Loader().el)
    cropperThumbEl.append(new Cropper({
      aspectRatio : 2/3,
      name: 'thumbnail',
      src: obj.thumbnail
    }).el)
    cropperImageEl.append(new Cropper({
      aspectRatio : 16/9,
      name: 'image',
      src: obj.image
    }).el)

    this.el.querySelector('.btn-close').addEventListener('click',()=>{
      modal.close()
      store.state.loading = false
    })

    this.el.querySelector('.btn-edit-confirm').addEventListener('click',()=>{
      formEl.dispatchEvent(new Event('submit'))
    })

    formThumbEl.addEventListener('input',event=>{
      cropperStore.state.thumbnailFile = event.target.files[0]
      console.log('cropperStore.state.thumbFile', cropperStore.state.thumbFile )
    })

    formImageEl.addEventListener('input',event=>{
      cropperStore.state.imageFile = event.target.files[0]
      console.log('cropperStore.state.imageFile', cropperStore.state.imageFile )
    })

    formEl.addEventListener('submit',event=>{
      event.preventDefault()
      store.state.loading = true
      if(!isSubmit){
        isSubmit = true

        changeInformation()
          .then(()=>{
            console.log('localStorage에 저장')
            localStorageArray[idx] = obj
            localStorage.setItem('champ', JSON.stringify({char : localStorageArray}))
            console.log('localStorage에 저장 완료',localStorage.getItem('champ'))
            modal.close() 
            cropperStore.state.thumbnailBlob = ''
            cropperStore.state.imageBlob = ''
            cropperStore.state.thumbnailFile = ''
            cropperStore.state.imageFile = ''
            store.state.loading = false
            location.replace(`/#/champion?name=${obj.name}`)
          }
          )
      }
      

      function changeInformation(){
        return new Promise((resolve,reject)=>{
          console.log('changeInformation 시작')

          if(obj.name !== event.target.querySelector('.form-name').value){
            obj.name = event.target.querySelector('.form-name').value
            history.state.name = obj.name
          }
            
          obj.nickname = event.target.querySelector('.form-nickname').value

          if(regionFormEl.value !== "국가 / 지역"){
            obj.region = regionFormEl.value
          }
          if(roleFormEl.value !== "역할"){
            obj.role = roleFormEl.value
          }
          if(positionFormEl.value !== "포지션"){
            obj.position = positionFormEl.value
          }
    
          const promises = []
          let imageChange = false
          let thumbChange = false
          if(cropperStore.state.thumbnailBlob){
            let temp = storeImageAndGetURL(cropperStore.state.thumbnailBlob)
            promises.push(temp)
            console.log('thumbnailBlob',temp )
            thumbChange = true
            }
          if(cropperStore.state.imageBlob){
            let temp = storeImageAndGetURL(cropperStore.state.imageBlob)
            promises.push(temp)
            console.log('imageBlob',temp )
            imageChange = true
            }

          if(promises.length === 2){
            Promise.all(promises).then(values=>{
              obj.image = values[1]
              obj.thumbnail = values[0]
              resolve()
            }).catch(error=>{
              console.log('StoreImageAndGetURL :',error)
              reject()
            })
          }else if(promises.length===1){
            if(imageChange){
              promises[0]              
              .then(url=>{
                console.log(url)
                obj.image = url
                console.log('image', obj.image)
                resolve()
              })
              .catch(error=>{
                console.log(error)
                reject()
              })
            }
            if(thumbChange){
              promises[0]           
                .then(url=>{
                  console.log(url)
                  obj.thumbnail = url
                  console.log('thumbnail', obj.thumbnail)
                  resolve()
                })
                .catch(error=>{
                  console.log(error)
                  reject()
                })
              }
            }else{
              resolve()
            }

            console.log('changeInformation 종료')
            })
        }
    })
  

    // blob을 받아, 링크를 리턴
    function storeImageAndGetURL(blob){
      return new Promise((resolve,reject)=>{
        const filename = Date.now();
        const imageRef = ref(storage, `newImage/${filename}.${blob.type.split('/')[1]}`)
      
        uploadBytes(imageRef, blob).then(snapshot => {
          console.log('Image uploaded:', snapshot.metadata.fullPath);
      
          // 이미지 업로드가 완료되면 이미지 URL을 받아옴
          getDownloadURL(snapshot.ref).then(downloadURL => {
            console.log('이미지 URL 반환')
            resolve(downloadURL)
          })
        }).catch(error => {
          reject('storeImageAndGetURL :', error)
        });  
        console.log('URL 가져오기 종료')
      }
      )
    }
  }
}