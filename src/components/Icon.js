import { Component } from "../core/core";
import iconInfo from "../info/iconInfo.json"

export default class Icon extends Component{
  constructor(props){
    super({
      props
    })
  }
  render(){
    this.el.setAttribute('position','relative')
    const iconImgEl = document.createElement('img')
    
    iconImgEl.classList.add('icon')
    iconImgEl.setAttribute('position','relative')
    iconImgEl.setAttribute("src", iconInfo[this.props])
    this.el.append(iconImgEl)


    // const infoEl = document.createElement('div')
    // infoEl.classList.add("info-div")
    // infoEl.textContent = this.props
    // this.el.append(infoEl)
  }
}