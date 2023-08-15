import { Component } from "../modules";

export default class NotFound extends Component {
  render() {
    this.el.classList.add("container", "not-found");
    this.el.innerHTML = /* html */ `
        <div class="not-found-image">
          <img src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg" alt="">
        </div>
        <h1>페이지 정보를 찾을 수 없어요..</h1>
    `;
  }
}
