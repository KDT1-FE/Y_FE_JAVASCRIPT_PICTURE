import { Component } from "../core/core";
import { storage, getDownloadURL, uploadBytes , ref } from "../../firebase"
import store from '../store/champion'
import Loader from './Loader'
import Cropper from "./Cropper";
import cropperStore from '../store/cropper'

// 새로운 챔피언을 등록하기 위해 사용자의 입력을 받기 위한 모달창과 form 태그를 가지고 있다.
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
    <dialog class="modal modal-add">
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

        <button class="btn btn-add-confirm"><span>등록</span></button>
      </form>
  </dialog>
    `
    const obj = this.props
    const localStorageArray = JSON.parse(localStorage.getItem('champ'))['char']

    const modal = this.el.querySelector('.modal-add')
    const regionFormEl = this.el.querySelector('.form-region')
    const roleFormEl = this.el.querySelector('.form-role')
    const positionFormEl = this.el.querySelector('.form-position')
    const nameEl = this.el.querySelector('.form-name')
    const nicknameEl = this.el.querySelector('.form-nickname')
    const formEl = this.el.querySelector('form')
    const cropperThumbEl = this.el.querySelector('.cropper-thumb')
    const cropperImageEl = this.el.querySelector('.cropper-image')
    const formThumbEl = this.el.querySelector('.form-thumbnail')
    const formImageEl = this.el.querySelector('.form-image')
    let isSubmit = false
    
    // 로딩창 화면 삽입
    modal.append(new Loader().el)

    // 사진 수정을 위한 Cropper 삽입(thumbnail, 배경 이미지 용도로 총 2개)
    cropperThumbEl.append(new Cropper({
      aspectRatio : 2/3,
      name: 'thumbnail'
    }).el)
    cropperImageEl.append(new Cropper({
      aspectRatio : 16/9,
      name: 'image'
    }).el)

    this.el.querySelector('.btn-close').addEventListener('click',()=>{
      modal.close()
      store.state.loading = false
    })

    // 제출 버튼 클릭시 강제 submit 이벤트 발생
    this.el.querySelector('.btn-add-confirm').addEventListener('click',()=>{
      formEl.dispatchEvent(new Event('submit'))
    })

    // 썸네일 사진을 사용자로부터 입력 받을 경우 file 형태로 store에 저장
    formThumbEl.addEventListener('input',event=>{
      cropperStore.state.thumbnailFile = event.target.files[0]
      console.log('cropperStore.state.thumbFile', cropperStore.state.thumbFile )
    })

    // 배경 사진을 사용자로부터 입력 받을 경우 file 형태로 store에 저장
    formImageEl.addEventListener('input',event=>{
      cropperStore.state.imageFile = event.target.files[0]
      console.log('cropperStore.state.imageFile', cropperStore.state.imageFile )
    })
    
    // 제출 했을 경우 다음고 같은 순서로 실행된다
    // 1. 유효성 검사 - chkValid()
    // 2. 중복 제출 방지 - isSubmit
    // 3. 정보를 등록(비동기) - addInformation()
    //  3-1. 사용자의 입력 값을 받아 Obj 객체를 생성 후에 덮어씌움
    //  3-2. 사진은 비동기적으로 작동을 하며, File 인스턴스를 입력받아 firebase URL을 가져옴(비동기) - storeIamgeAndgetURL
    //    3-2-1. blob 객체를 받아 파이어베이스 storage에 저장 후 URL을 받아옴(비동기) - storeImageAndGetURL
    // 4. URL을 받을 때까지 기다린 후 localStorage에 저장 후 이름순으로 정렬

    formEl.addEventListener('submit',event=>{
      event.preventDefault()
      if(chkValid()){
        if(!isSubmit){
          isSubmit = true
          store.state.loading = true
          addInformation()
          .then(()=>{
            console.log('localStorage에 저장')
            localStorageArray.push(obj)
            localStorageArray.sort(
              (a,b)=>{
                if(a.name > b.name){
                  return 1
                }else if(a.name<b.name){
                  return -1
                }else return 0
              }
              )
            localStorage.setItem('champ', JSON.stringify({char : localStorageArray}))
            console.log('localStorage에 저장 완료',localStorage.getItem('champ'))
            store.state.loading = false
            cropperStore.state.thumbnailBlob = ''
            cropperStore.state.imageBlob = ''
            cropperStore.state.thumbnailFile = ''
            cropperStore.state.imageFile = ''
            modal.close() 
            location.replace(`/#/`)
          }
          )
        }
      }
      
      // input 태그들이 유효한지 검사
      function chkValid(){
        if(!nameEl.value){
          alert('이름을 입력하세요!')
          return false
        }
        if(!nicknameEl.value){
          alert('별명을 입력하세요!')
          return false
        }
        if(!cropperStore.state.thumbnailBlob){
          alert("썸네일 확정을 눌러주세요")
          return false
        }
        if(!cropperStore.state.imageBlob){
          alert("이미지 확정을 눌러주세요")
          return false
        }
        return true
      }
      

    // 입력받은 input 태그들의 값으로 obj을 추가함
      function addInformation(){
        return new Promise((resolve,reject)=>{
          console.log('addInformation 시작')
          obj.name = event.target.querySelector('.form-name').value
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
              obj.thumbnail = values[0]
              obj.image = values[1]
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
            console.log('addInformation 종료')
            })
        }
    })

    // blob을 받아, 링크를 리턴
    function storeImageAndGetURL(blob){
      return new Promise((resolve,reject)=>{
        console.log('URL가져오기')
        // 이미지 파일을 Blob으로 변환

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