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
          <li>
            <div class="worker-img-box">
              <img src=${imgURL}/>
            </div>
          </li>
          <li>${number}</li>
          <li>${name}</li>
          <li>${department}</li>
          <li>${rank}</li>
          <li>${email}</li>
      </ul>
    `;
    const workerEl = this.el.querySelector("#worker");
    workerEl.addEventListener("click", () => {
      location.replace(`/#/detail?name=${name}&number=${number}`);
    });
  }
}
