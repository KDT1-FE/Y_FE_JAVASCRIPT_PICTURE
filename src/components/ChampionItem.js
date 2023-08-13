import { Component } from "../core/core";
import Icon from "./Icon"
import championStore from "../store/champion";

export default class ChampionItem extends Component{
  constructor(props){
    super({
      tagName:'a',
      props
    })
    championStore.subscribe('isDeleteState', ()=>{
      this.render()})
  }
  render(){
    const champion = this.props
    this.el.setAttribute("href",`#/champion?name=${champion.name}`)
    this.el.classList.add('champion')
    this.el.style.backgroundImage = `url(${champion.thumbnail})`
    this.el.innerHTML = /* html */`
      <div class="iconwrap">
      </div>
      <div class="info">
        <h2>${champion.nickname}</h2>
        <h1>${champion.name}</h1>
      </div>

      <div class="champion-item-delete"><input type="checkbox" class="hide input-delete" value="delete" id="delete${champion.name}"></div>
      <label for="delete${champion.name}" style=" position:absolute; top:0; left:0; bottom:0; right:0; backgroundColor:yellow "></label>
    `
    const iconwrapEl = this.el.querySelector('.iconwrap')
    const deleteInputEl = this.el.querySelector('.input-delete')

    iconwrapEl.append(
      new Icon(champion.region).el,
      new Icon(champion.role).el,
      new Icon(champion.position).el
    )
    
    if(championStore.state.isDeleteState){
      deleteInputEl.classList.remove('hide')
      this.el.style.backgroundBlendMode = "darken"
    }else{
      deleteInputEl.classList.add('hide')
      this.el.style.backgroundBlendMode = "normal"
    }
    // championStore.state.deleteObj = {}
    deleteInputEl.addEventListener('input',event=>{
      console.log(event)
      championStore.state.deleteObj[champion.name] = event.target.checked
    })
  }
}