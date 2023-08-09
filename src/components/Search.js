import { Component } from "../core/core";

export default class Search extends Component{
  render(){
    this.el.classList.add('search')
    this.el.innerHTML=/* html */`
      <input placeholder="가렌"> 
      <span class="btn-wrap">
        <button class="btn btn-search"> 검색 </button>
        <button class="btn btn-add"> 등록 </button>
        <button class="btn btn-delete"> 삭제 </button>
      </span>
    `
  }
}