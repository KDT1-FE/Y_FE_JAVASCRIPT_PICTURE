import { Component } from "../../modules";

export default class RegHeadline extends Component {
  render() {
    this.el.classList.add("new-item");
    this.el.innerHTML = /* html */ `
             <h1>
                <span>Employee</span> DB
            </h1>
            <p>
                직원 등록 서비스입니다. <br />
                직원의 정보를 입력 후 저장 버튼을 누르세요.
            </p>
        `;
  }
}
