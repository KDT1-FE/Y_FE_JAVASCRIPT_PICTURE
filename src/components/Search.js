import { Component } from "../core/core";
import championStore, {setLocalStorage , searchChampionsbyName } from "../store/champion"
import DialogAdd from '../components/DialogAdd'

export default class Search extends Component{
  render(){
    this.el.classList.add('search')
    this.el.innerHTML=/* html */`
      <input placeholder="ex) 가렌, 가, (공백)"> 
      <div class="btn-wrap">
        <button class="btn btn-search"><span> 검색 </span></button>
        <button class="btn btn-reset"><span> 초기화 </span></button>
        <button class="btn btn-add"><span> 등록 </span></button>
        <button class="btn btn-delete"><span> 삭제 </span></button>
      </div>
    `
    this.el.append(new DialogAdd().el)
    let localStorageArray = JSON.parse(localStorage.getItem('champ'))['char']
    const modal = this.el.querySelector('dialog')
    const inputEl = this.el.querySelector('input')

    // 검색창 입력
    inputEl.addEventListener('input',()=>{
      championStore.state.searchText = inputEl.value
    })
    inputEl.addEventListener("keydown", event=>{
      if(event.key === "Enter"){
        searchChampionsbyName(championStore.state.searchText)
      }
    })
    const searchBtnEl = this.el.querySelector('.btn-search')
    searchBtnEl.addEventListener('click',()=>{
      searchChampionsbyName(championStore.state.searchText)
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
      if(!championStore.state.isDeleteState){
        championStore.state.isDeleteState = true
      }else{
        championStore.state.isDeleteState = false

        if(Object.keys(championStore.state.deleteObj).length){
          for(let name in championStore.state.deleteObj){
            if(championStore.state.deleteObj[name]){
              localStorageArray = localStorageArray.filter(obj=>obj.name !== name)
            }
          }
          localStorage.setItem('champ', JSON.stringify({char : localStorageArray}))
          championStore.state.deleteObj = {}
          location.reload()
        }
      }
    })
  }
}