import { Component } from "../core/core";
import Icon from "./Icon"
import championStore from "../store/champion";

export default class ChampionItem extends Component{
  constructor(props){
    super({
      props
    })
    championStore.subscribe('isDeleteState', ()=>{
      this.render()})
  }
  render(){
    const champion = this.props
    this.el.classList.add('champion-wrap')
    this.el.innerHTML = /* html */`
      <a class="champion">
        <div class="iconwrap">
        </div>
        <div class="info">
          <h2>${champion.nickname}</h2>
          <h1>${champion.name}</h1>
        </div>
          <div class="champion-item-delete"><input type="checkbox" class="hide input-delete" value="delete" id="delete${champion.name}"></div>
          <label class="hide" for="delete${champion.name}" style=" position:absolute; top:0; left:0; bottom:0; right:0; backgroundColor:yellow "></label>
      </a>
    `
    const championEl = this.el.querySelector('a')
    championEl.setAttribute("href",`#/champion?name=${champion.name}`)
    championEl.style.backgroundImage = `url(${champion.thumbnail})`
    
    const iconwrapEl = this.el.querySelector('.iconwrap')
    const deleteInputEl = this.el.querySelector('.input-delete')
    const labelEl = this.el.querySelector('label')

    iconwrapEl.append(
      new Icon(champion.region).el,
      new Icon(champion.role).el,
      new Icon(champion.position).el
    )
    
    if(championStore.state.isDeleteState){
      labelEl.classList.remove('hide')
      deleteInputEl.classList.remove('hide')
      championEl.style.backgroundBlendMode = "difference"
    }else{
      deleteInputEl.classList.add('hide')
      labelEl.classList.add('hide')
      championEl.style.backgroundBlendMode = "normal"
    }
    // championStore.state.deleteObj = {}
    deleteInputEl.addEventListener('input',event=>{
      championStore.state.deleteObj[champion.name] = event.target.checked
    })
  }
}