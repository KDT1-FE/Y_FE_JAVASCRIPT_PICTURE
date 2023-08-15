import { Component } from "../../core/";

export class TheFooter extends Component {
  constructor() {
    super({
      tagName: "footer",
    });
  }
  render() {
    this.el.className = "ems-footer py-4";
    this.el.id = "ems-footer";
    this.el.innerHTML = /* html */ `
      <div class="container mx-auto px-4">
        <h1 class="text-md">&copy; EMS JS. 2023. all rights reserved.</h1>
      </div>
    `;
  }
}
