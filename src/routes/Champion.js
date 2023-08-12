import { Component } from "../core/core"
import Icon from "../components/Icon"
import Dialog from '../components/Dialog'


export default class Champion extends Component{
  constructor(){
    super()
  }
  render(){
    console.log('is it render?')
    // 쿼리스트링으로 전달 시 한글은 URL인코딩 방식을 사용한다. 그래서 history.state에서 한글을 넘겨 받을 때, decodeURI 메소드를 사용
    const localStorageArray = JSON.parse(localStorage.getItem('champ'))['char']
    const champion = localStorageArray.find(obj=>obj.name === decodeURI(history.state.name))
    console.log(champion)

    this.el.style.backgroundColor = 'black' 
    this.el.innerHTML = /* html */`
      <div class="specific-inner-container">
        <div class="specific-img">
        </div>
        <button class="btn btn-edit"> 수정 </button>
        <div class="specific-info">
          <div class="specific-info-name"> 
              <h2>${champion.nickname}</h2>
              <h1>${champion.name}</h1>
            </div>
          <div class="specific-info-iconwrap">
            <div class="specific-region">
            </div>
            <div class="specific-role">
            </div>
            <div class="specific-position">
            </div>
          </div>
        </div>
      </div>
    `

    this.el.querySelector('.specific-img').style.backgroundImage = `url(${champion.image})`
    const createDiv = text => {
      const divEl = document.createElement('div')
      divEl.innerHTML = text
      return divEl
    }

    this.el.querySelector(".specific-region").append(
      createDiv("지역/국가"),
      new Icon(champion.region).el,
      champion.region
      )

    this.el.querySelector(".specific-role").append(
      createDiv("역할군"),
      new Icon(champion.role).el,
      champion.role
      )

    this.el.querySelector(".specific-position").append(
      createDiv("포지션"),
      new Icon(champion.position).el,
      champion.position
    )
    
    this.el.append(new Dialog(champion).el)
    
    const modal = this.el.querySelector('dialog')
    this.el.querySelector('.btn-edit').addEventListener('click',()=>{
      modal.showModal()
    })
    
  }
}