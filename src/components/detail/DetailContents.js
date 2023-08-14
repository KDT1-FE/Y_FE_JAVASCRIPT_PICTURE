import { Component } from "../../core";

export class DetailContents extends Component {
  render() {
    this.el.className = "mb-6 md:grid md:grid-cols-2 md:gap-3";
    this.el.innerHTML = /* html */ `
      <div class="aspect-square">
        <img src=${this.props.fileUrl} alt=${this.props.fileName} />
      </div>
      <div>
        <h3
          class="mb-3 mt-4 border-b-[1px] border-solid border-b-gray-600 pb-3 text-lg font-bold md:mt-0"
        >
          직원 정보
        </h3>
        <div class="columns-2 gap-3">
          <div
            class="mb-4 w-full border-b-[1px] border-solid border-b-gray-300"
          >
            <h4 class="text-md mb-2 text-gray-600">성명</h4>
            <p class="text-xl">${this.props.fullName}</p>
          </div>
          <div
            class="mb-4 w-full border-b-[1px] border-solid border-b-gray-300"
          >
            <h4 class="text-md mb-2 text-gray-600">직책</h4>
            <p class="text-xl">${this.props.category}</p>
          </div>
        </div>
        <div class="mb-4 border-b-[1px] border-solid border-b-gray-300">
          <h4 class="text-md mb-2 text-gray-600">이메일</h4>
          <p class="text-xl">${this.props.email}</p>
        </div>
        <div class="mb-4 border-b-[1px] border-solid border-b-gray-300">
          <h4 class="text-md mb-2 text-gray-600">연락처</h4>
          <p class="text-xl">${this.props.phone}</p>
        </div>
      </div>
    `;
  }
}
