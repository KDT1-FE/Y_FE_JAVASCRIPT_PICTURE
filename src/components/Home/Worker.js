import { Component } from "../../core/core";

export default class Worker extends Component {
  render() {
    this.el.innerHTML = /* html */ `
    <ul class="worker-box" id="worker">
        <li id="check">
            <input type="checkbox"/>
        </li>
        <li>
            <img src=${EojoonHyuk}/>
        </li>
        <li>19017060</li>
        <li>어준혁</li>
        <li>010-3016-0696</li>
        <li>프론트엔드</li>
        <li>CTO</li>
        <li>djwnsgur741@naver.com</li>
    </ul>
    `;
  }
}
