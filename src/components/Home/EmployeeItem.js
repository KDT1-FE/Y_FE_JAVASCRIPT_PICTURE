import { Component } from "../../modules";

export default class EmployeeItem extends Component {
  constructor(props) {
    super({
      props,
      tagName: "a",
    });
  }
  render() {
    const { item } = this.props;

    this.el.setAttribute("href", `#/detail?id=${item.id}`);
    this.el.classList.add("employee");

    this.el.innerHTML = /* html */ `
       <div class="info">
            <div class="image">
               <img src=" ${item.profile}" alt="">
            </div>
            <div class="name">
                ${item.name}
            </div>
            <div class="email">
                ${item.email}
            </div>
            <div class="phone">
                ${item.phone}
            </div>
            <div class="division">
                ${item.division}
            </div>
       </div>
    `;
  }
}
