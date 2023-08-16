import { Component } from "../core/core";
import store from "../store/champion";

export default class Component extends Component{
  constructor(){
    super()
    store.subscribe('loading',()=>{
      this.render()
    })
  }
  render(){
    const loadingEl = this.el
    this.el.innerHTML = /* html */`
    <div class="the-loader"> </div>
    <div class="loader-wall"> </div>
    `
    if(!store.state.loading){
      loadingEl.classList.add('hide')
    }else{
      loadingEl.classList.remove('hide')
    }

  }
}