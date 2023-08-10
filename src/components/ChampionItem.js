import { Component } from "../core/core";
import Icon from "./Icon"

export default class ChampionItem extends Component{
  constructor(props){
    super({
      tagName:'a',
      props
    })
  }
  render(){
    const champion = this.props

    this.el.classList.add('champion')
    this.el.style.backgroundImage = `url(${champion.thumbnail})`
    this.el.innerHTML = /* html */`
      <div class="iconwrap">
      </div>
      <div class="info">
        <h2>${champion.nickname}</h2>
        <h1>${champion.name}</h1>
      </div>

    `
    const iconwrap = this.el.querySelector('.iconwrap')
    iconwrap.append(
      new Icon(champion.region).el,
      new Icon(champion.role).el,
      new Icon(champion.position).el

    )

  }
}