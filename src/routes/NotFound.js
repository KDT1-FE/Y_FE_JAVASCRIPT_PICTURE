import { Component } from "../core";

export default class NotFound extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "container mx-auto px-4";
    container.innerHTML = /* html */ `
      <div class="h-[500px] inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl">
        <div class="flex justify-center items-center flex-col h-full">
          <h2 class="text-4xl font-bold mb-6">Not Found</h2>
          <h3 class="text-2xl font-bold">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</h3>
        </div>
      </div>
    `;

    this.el.className = "main-contents min-h-[88vh] bg-[#f2f2f2] py-4";
    this.el.append(container);
  }
}
