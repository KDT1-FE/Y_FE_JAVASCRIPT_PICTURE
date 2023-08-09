import { Component } from "../core/core";

export default class ChampionItem extends Component{
  constructor(props){
    super({
      tagName:'a',
      props
    })
  }
  render(){
    console.log(this.props)
    const champion = this.props
    this.el.classList.add('champion')
    this.el.style.backgroundImage = `url(${champion.thumbnail})`
    this.el.innerHTML = /* html */`
      <div class="iconwrap">
        <div> ${champion.region} </div>
        <div> ${champion.role} </div>
        <div> ${champion.position} </div>
      </div>
      <div class="info">
        <h2>${champion.nickname}</h2>
        <h1>${champion.name}</h1>
      </div>

    `

  }
}