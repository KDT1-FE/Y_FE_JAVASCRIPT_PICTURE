import { Component } from "../../core";
import memberStore from "../../store/memberlist";
import { HomeMemberItem } from "./HomeMemberItem";

export default class HomeMemberList extends Component {
  constructor() {
    super();
    memberStore.subscribe("members", () => this.render());
    memberStore.subscribe("loading", () => this.render());
    // memberStore.subscribe("lastScrollKey", () => this.render());
  }
  render() {
    this.el.id = "memberList";
    this.el.innerHTML = /* html */ `
      <div><div class="the-loader hide"></div></div>
    `;
    // 객체의 중복을 제거 합니다.
    const uniqueMembers = memberStore.state.members.reduce(function (
      acc,
      current,
    ) {
      if (acc.findIndex(({ id }) => id === current.id) === -1) {
        acc.push(current);
      }
      return acc;
    }, []);
    // 중복 되지 않은 요소만 append 합니다.
    this.el.prepend(
      ...uniqueMembers.map((member) => new HomeMemberItem({ member }).el),
    );

    const loaderEl = this.el.querySelector(".the-loader");
    memberStore.state.loading
      ? loaderEl.classList.remove("hide")
      : loaderEl.classList.add("hide");

    /**
     * 사용자가 선택한 삭제할 요소의 아이디 값들을 store에서 가져옵니다.
     * 혹시 모를 중복을 방지하기 위해 Set구조로 가져옵니다.
     */
    const deleteIds = new Set(memberStore.state.deleteIds);
    /**
     * 모든 input[checkbox] 에 이벤트를 주지 않고
     * 부모 요소에서 change 이벤트를 위임해서 사용합니다.
     */
    this.el.addEventListener("change", (e) => {
      deleteIds.add(e.target.closest(".grid.grid-cols-7").id);
      memberStore.state.deleteIds = deleteIds;
    });
  }
}
