import { Component } from "../../core/core";

export default class Worker extends Component {
  constructor(payload) {
    super({
      props: payload.props,
    });
  }
  render() {
    const { imgURL, name, department, number, rank, email } = this.props;
    this.el.innerHTML = /* html */ `
      <ul class="worker-box" id="worker">
          <li id="check">
              <input type="checkbox"/>
          </li>
          <li>
              <img src=${imgURL}/>
          </li>
          <li>${number}</li>
          <li>${name}</li>
          <li>${department}</li>
          <li>${rank}</li>
          <li>${email}</li>
      </ul>
    `;
  }
}
