import { Component } from "../core/core";
import iconInfo from "../info/iconInfo.json"

export default class Icon extends Component{
  constructor(props){
    super({
      props,
      tagName: 'img'
    })
  }
  render(){
    this.el.classList.add('icon')
    this.el.setAttribute("src", iconInfo[this.props])
  }
}