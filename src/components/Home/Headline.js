import { Component } from "../../modules";

export default class Headline extends Component {
  render() {
    this.el.classList.add("headline");
    this.el.innerHTML = /* html */ `
            <h1>
                <span>Employee</span> DB
            </h1>
            <p>
                Employee DB는 자사 직원의 정보를 열람하는 서비스입니다. <br />
                검색을 통해 자사 직원을 검색하고, 데이터 정보를 변경 및 삭제해보세요.
            </p>
            <br>
            <p>자유롭게 건들여보셔두 됩니다!</p>
        `;
  }
}
