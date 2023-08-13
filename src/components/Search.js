import { Component } from "../core/core";
import store, {setLocalStorage , searchChampionsbyName } from "../store/champion"
import DialogAdd from '../components/DialogAdd'

export default class Search extends Component{
  render(){
    this.el.classList.add('search')
    this.el.innerHTML=/* html */`
      <input placeholder="ex) 가렌"> 
      <span class="btn-wrap">
        <button class="btn btn-search"> 검색 </button>
        <button class="btn btn-reset"> 초기화 </button>
        <button class="btn btn-add"> 등록 </button>
        <button class="btn btn-delete"> 삭제 </button>
      </span>
    `
    this.el.append(new DialogAdd().el)
    const modal = this.el.querySelector('dialog')
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input',()=>{
      store.state.searchText = inputEl.value
    })
    inputEl.addEventListener("keydown", event=>{
      if(event.key === "Enter"){
        searchChampionsbyName(store.state.searchText)
      }
    })
    const searchBtnEl = this.el.querySelector('.btn-search')
    searchBtnEl.addEventListener('click',()=>{
      searchChampionsbyName(store.state.searchText)
    })

    const resetBtnEl = this.el.querySelector('.btn-reset')
    resetBtnEl.addEventListener('click',()=>{
      localStorage.clear()
      setLocalStorage()
      location.reload()
    })

    const addBtnEl = this.el.querySelector('.btn-add')
    addBtnEl.addEventListener('click',()=>{
      modal.showModal()
    })
    const deleteBtnEl = this.el.querySelector('.btn-delete')
    deleteBtnEl.addEventListener('click',()=>{
    })
  }
}