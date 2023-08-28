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
        <img class="main-img" src=https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/icons%2Flogo-1200-04b3cefafba917c9c571f9244fd28a1e%20(1).png?alt=media&token=6960ba53-cf19-4fed-844a-8fd0aad3696a > 
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