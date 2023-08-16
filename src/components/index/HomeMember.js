import { Component } from "../../core";
import HomeMemberList from "./HomeMemberList";
import memberStore from "../../store/memberlist";

export class HomeMember extends Component {
  render() {
    this.el.className = "inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl";
    this.el.innerHTML = /* html */ `
      <div class="mb-3 flex items-center justify-between">
        <h3 class="mb-3 text-xl font-bold">
          <span class="material-icons align-middle"> list </span> 직원 목록
        </h3>
        <div class="flex">
          <a href="/#/create"
            id="addUserBtn"
            class="rounded-md bg-blue-600 p-3 text-white mr-2"
          >
            <span class="material-icons align-top"> person_add </span>
            직원 추가
          </a>
          <button
            id="delUserBtn"
            class="rounded-md bg-red-500 p-3 text-white"
          >
            <span class="material-icons align-top"> person_remove </span>
            선택 직원 삭제
          </button>
        </div>
      </div>
      <div
        class="grid grid-cols-7 gap-2 bg-stone-100 py-2 text-center md:grid-cols-12"
      >
        <p class="col-span-1">
          <input type="checkbox" id="chkAllMember" />
        </p>
        <p class="col-span-2 md:col-span-3">프로필 사진</p>
        <p class="col-span-2">성명</p>
        <p class="hidden md:col-span-2 md:block">이메일</p>
        <p class="hidden md:col-span-2 md:block">연락처</p>
        <p class="col-span-2">직책</p>
      </div>
    `;
    const memberlist = new HomeMemberList().el;
    this.el.append(memberlist);

    const delUserBtn = this.el.querySelector("#delUserBtn");
    const chkAllMember = this.el.querySelector("#chkAllMember");
    delUserBtn.addEventListener("click", () => {
      if (memberStore.state.deleteIds.length === 0) {
        alert("선택된 직원이 없습니다.");
        return;
      }
      const delModal = document.getElementById("delUserModal");
      delModal.showModal();
    });
    let chk = false;
    const deleteIds = new Set();
    chkAllMember.addEventListener("click", () => {
      if (chk) {
        chk = false;
      } else {
        chk = true;
      }
      const chkboxs = document.querySelectorAll(".memberChkbox");
      chkboxs.forEach((chkbox) => {
        const parent = chkbox.closest(".grid.grid-cols-7");
        chkbox.checked = chk;
        if (chkbox.checked) deleteIds.add(parent.id);
        else deleteIds.clear();
      });
      memberStore.state.deleteIds = Array.from(deleteIds);
    });
  }
}
