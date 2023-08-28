import { Component } from "../../core";

export default class CreateInput extends Component {
  constructor({ props }) {
    super({
      props: {
        ...props,
        memberDetail: props.memberDetail ?? {},
      },
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
    <h4 class="mb-2">${this.props.label}</h4>
    <input
      type="${this.props.name === "email" ? "email" : "text"}"
      placeholder="${this.props.holder}"
      name="${this.props.name}"
      class="w-full rounded-md border-[1px] border-gray-200 px-4 py-2"
      autocomplete="off"
      value="${this.props?.memberDetail[this.props.name] ?? ""}"
    />
    <p id="${this.props.name}Message" class="py-2 h-8 text-red-500"></p>
    `;
  }
}
