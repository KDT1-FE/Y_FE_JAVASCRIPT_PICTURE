import { Component } from "../../core";

export class HomeMemberItem extends Component {
  constructor(props) {
    super({
      props,
    });
  }

  render() {
    const { member } = this.props;
    this.el.className =
      "grid grid-cols-7 md:grid-cols-12 gap-2 py-2 text-center";
    this.el.id = member.id;
    this.el.innerHTML = /* html */ `
      <div class="col-span-1">
        <input type="checkbox" class="memberChkbox" />
      </div>
      <div class="col-span-2 md:col-span-3 aspect-square">
        <a href=/#/detail?id=${member.id}>
          <img src=${member.fileUrl} alt=${member.fileName} />
        </a>
      </div>
      <div class="col-span-2 md:col-span-2">
        ${member.fullName}
      </div>
      <div class="hidden md:block col-span-2 md:col-span-2">
        ${member.email}
      </div>
      <div class="hidden md:block col-span-2 md:col-span-2">
        ${member.phone}
      </div>
      <div class="col-span-2 md:col-span-2">
        ${member.category}
      </div>
    `;
  }
}
