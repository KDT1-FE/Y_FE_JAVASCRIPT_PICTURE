import { Component } from "../../core";

export default class CreateSelc extends Component {
  constructor({ props }) {
    super({
      props: {
        ...props,
        options: props.options ?? [],
        memberDetail: props.memberDetail ?? {},
      },
    });
  }
  render() {
    this.el.className = "w-full";
    this.el.innerHTML = /* html */ `
      <h4 class="mb-2">${this.props.label}</h4>
      <select name="${this.props.name}" class="w-full py-2">
        ${this.props.options
          .map(
            (option) =>
              `<option value="${option.value}" ${
                this.props.memberDetail[this.props.name] === option.value
                  ? "selected"
                  : ""
              }>${option.text}</option>`,
          )
          .join("")}
      </select>
    `;
  }
}
