import { Component } from "../core/core";

export default class Headline extends Component{
  render(){
    this.el.classList = "headline"
    this.el.innerHTML = /* html */`
      
      <img src=https://firebasestorage.googleapis.com/v0/b/employee-management-c0a21.appspot.com/o/icons%2Flogo-1200-04b3cefafba917c9c571f9244fd28a1e%20(1).png?alt=media&token=6960ba53-cf19-4fed-844a-8fd0aad3696a > 
      <h2> 당신이 알고싶은 <span>챔피언</span>을 검색하시오 </h2>
    `
  }
}