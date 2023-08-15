import { Component } from "../../modules";

export default class DetailHeadline extends Component {
  render() {
    this.el.classList.add("detail-headline");
    this.el.innerHTML = /* html */ `
             <h1>
                <span>Employee</span> DB
            </h1>
            <p>
                직원 상세 정보 및 변경 서비스입니다. <br />
                직원의 상세 정보를 확인 및 수정할 수 있습니다.
            </p>
        `;
  }
}
