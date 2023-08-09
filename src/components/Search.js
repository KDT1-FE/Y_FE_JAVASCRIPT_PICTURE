import { Component } from "../core/core";
import store, {setLocalStorage} from "../store/champion"

export default class Search extends Component{
  render(){
    this.el.classList.add('search')
    this.el.innerHTML=/* html */`
      <input placeholder="가렌"> 
      <span class="btn-wrap">
        <button class="btn btn-search"> 검색 </button>
        <button class="btn btn-reset"> 초기화 </button>
        <button class="btn btn-add"> 등록 </button>
        <button class="btn btn-delete"> 삭제 </button>
      </span>
    `
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input',()=>{
      store.state.searchText = inputEl.value
    })

    const searchBtnEl = this.el.querySelector('.btn-search')
    searchBtnEl.addEventListener('click',()=>{
      
    })

    const resetBtnEl = this.el.querySelector('.btn-reset')
    resetBtnEl.addEventListener('click',()=>{
      localStorage.clear()
      setLocalStorage()
    })

    const addBtnEl = this.el.querySelector('.btn-add')
    addBtnEl.addEventListener('click',()=>{
      
    })
    const deleteBtnEl = this.el.querySelector('.btn-delete')
    deleteBtnEl.addEventListener('click',()=>{
      
    })
  }
}