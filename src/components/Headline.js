import { Component } from "../core/core";

export default class Headline extends Component{
  render(){
    this.el.innerHTML = /* html */`
      <h1> League of Legends</h1>
      <h2> 당신이 알고싶은 챔피언을 검색하시오 <h2>
    `
  }

}