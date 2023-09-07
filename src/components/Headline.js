import { Component } from "../core/core";
import store from "../store/champion";
import Loader from "../components/Loader"

export default class Headline extends Component{
  constructor(){
    super()
  }
  render(){
    store.state.loading = true
    this.el.classList = "headline"
    this.el.innerHTML = /* html */`
      <div style="position:relative; display:flex; justify-content: center; align-items: center; flex-flow:column">
        <img class="main-img" 
          srcset= 
            "https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/icons%2F%EB%A1%9C%EA%B3%A01200_529.webp?alt=media&token=4fb8f820-d143-455e-8065-5a72428ee1f2 1200w,
            https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/icons%2F%EB%A1%9C%EA%B3%A0800_356.webp?alt=media&token=88feb483-1ba2-4337-b31c-7f75ed85dfc1 800w,
            https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/icons%2F%EB%A1%9C%EA%B3%A0400_176.webp?alt=media&token=70e267dd-c525-4f74-b34d-bb895cc9bdb2 400w"
            
          > 
        <div class="main-img skeleton"> </div>
        <h2> 당신의 <span>챔피언</span>을 관리해 보세요 </h2>
      </div>
    `
    // 로딩화면 추가
    this.el.append(new Loader().el)
    this.el.querySelector('img').onload = ()=>{
      store.state.loading = false
      document.querySelector('.skeleton').style.display = 'none'
    }
  }
}