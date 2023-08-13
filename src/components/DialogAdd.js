import { Component } from "../core/core";
import { storage, getDownloadURL, uploadBytes , ref } from "../../firebase"

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
      tagName: 'dialog',
      props
    })
  }
  render(){
    const champion = this.props
    this.el.classList.add('modal', 'modal-edit')
    this.el.innerHTML = /*html */`
      <button class="btn btn-close">X</button>
      <form> 
        <div><span>이름 : </span><input class="form-name" placeholder="이름" value="${champion.name}"/></div>
        <div><span>별명 : </span><input class="form-nickname" placeholder="별명" value="${champion.nickname}"/> </div>
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
        <div><span>썸네일이미지 : </span><input class="form-thumbnail" placeholder="썸네일 이미지" type="file" accept="image/*"></div>
        <div><span> 배경이미지 : </span><input class="form-image" placeholder="썸네일 이미지" type="file" accept="image/*"></div>
        <input type="submit">
      </form>
    `

    const modal = this.el
    
    this.el.querySelector('.btn-close').addEventListener('click',()=>{
      modal.close()
    })

    const localStorageArray = JSON.parse(localStorage.getItem('champ'))['char']
    const regionFormEl = this.el.querySelector('.form-region')
    const roleFormEl = this.el.querySelector('.form-role')
    const positionFormEl = this.el.querySelector('.form-position')

    const obj = this.props

    this.el.querySelector('form').addEventListener('submit',event=>{
      event.preventDefault()

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
          modal.close() 
          location.replace(`/#/`)
        }
        )

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
          if(event.target.querySelector('.form-image').files.length){
            promises.push(storeImageAndGetURL(event.target.querySelector('.form-image').files[0]))
            imageChange = true
            }
          if(event.target.querySelector('.form-thumbnail').files.length){
            promises.push(storeImageAndGetURL(event.target.querySelector('.form-thumbnail').files[0]))
            thumbChange = true
            }

          if(promises.length === 2){
            Promise.all(promises).then(values=>{
              obj.image = values[0]
              obj.thumbnail = values[1]
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

    function storeImageAndGetURL(file){
      return new Promise((resolve,reject)=>{
        console.log('URL가져오기')
        if (!file) reject('storeImageAndGetURL : file doesnt exist!')
        // 이미지 파일을 Blob으로 변환
        const blob = new Blob([file], { type: file.type });
        console.log(file)
        const filename = Date.now();
        const imageRef = ref(storage, `newImage/${filename}.${file.type.split('/')[1]}`)
      
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