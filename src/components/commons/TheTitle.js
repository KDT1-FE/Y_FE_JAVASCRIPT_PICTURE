import { Component } from "../../core";

export class TheTitle extends Component {
  constructor(payload) {
    super({
      props: payload.props,
    });
  }
  render() {
    this.el.className = "inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl";
    this.el.innerHTML = /* html */ `
      <!-- 상단 제목 영역 시작 -->
      <div class="justify-between md:flex">
        <div class="flex items-center">
          <div
            class="mr-3 flex h-16 w-16 items-center justify-center rounded-md bg-gray-100"
          >
            <span class="material-icons md-36">group</span>
          </div>
          <div>
            <h2 class="mb-2 text-2xl font-bold">${this.props.titleTxt}</h2>
            <p>${this.props.descTxt}</p>
          </div>
        </div>
      </div>
    `;
  }
}
