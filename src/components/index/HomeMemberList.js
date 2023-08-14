import { Component } from "../../core";
import memberStore from "../../store/memberlist";
import { HomeMemberItem } from "./HomeMemberItem";

export default class HomeMemberList extends Component {
  constructor() {
    super();
    memberStore.subscribe("members", () => this.render());
    // memberStore.subscribe("lastScrollKey", () => this.render());
  }
  render() {
    this.el.id = "memberList";
    this.el.innerHTML = "";
    this.el.append(
      ...memberStore.state.members.map(
        (member) => new HomeMemberItem({ member }).el,
      ),
    );
    const deleteIds = new Set(memberStore.state.deleteIds);
    this.el.addEventListener("change", (e) => {
      deleteIds.add(e.target.closest(".grid.grid-cols-7").id);
      memberStore.state.deleteIds = deleteIds;
      // console.log(memberStore.state.deleteIds);
    });
  }
}
