import { Component } from "../../core";
import memberStore from "../../store/memberlist";
import { deleteMember } from "../../libraries/firebase-firestore";

export class DetailDeleteModal extends Component {
  constructor() {
    super({ tagName: "dialog" });
  }
  render() {
    this.el.className =
      "container mx-auto h-screen max-w-3xl md:h-[230px] md:rounded-xl";
    this.el.id = "delUserModal";
    this.el.innerHTML = /* html */ `
      <div class="h-full w-full px-4">
        <div class="flex items-center justify-between">
          <h3 class="py-4 text-xl font-bold">직원 삭제</h3>
          <div
            class="dialog-close flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-gray-200"
          >
            <span class="material-icons"> close </span>
          </div>
        </div>
        <p class="mb-5 text-center text-lg">
          삭제가 진행되면 삭제된 직원의 정보는 <br />영구적으로 제거 되며 복구할 수
          없습니다. <br />계속 하시겠습니까?
        </p>
        <form method="dialog" class="grid grid-cols-3 gap-3">
          <button type="reset" class="w-full rounded-md bg-gray-200 p-3">
            <span class="material-icons align-top"> refresh </span> 삭제 취소
          </button>
          <button
            type="submit"
            class="col-span-2 w-full rounded-md bg-red-500 p-3 text-white"
          >
            <span class="material-icons align-top"> person_remove </span> 삭제 확인
          </button>
        </form>
      </div>
    `;

    const modal = this.el;
    const closeBtn = modal.querySelector(".dialog-close");
    const form = modal.querySelector("form");
    form.method = "dialog";

    modal.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) modal.close();
    });
    closeBtn.addEventListener("click", () => {
      modal.close();
    });
    form.addEventListener("reset", () => {
      memberStore.state.deleteIds = [];
      modal.close();
    });
    form.addEventListener("submit", async () => {
      const deleteIds = Array.from(memberStore.state.deleteIds);
      const deletePromise = deleteIds.map((deleteId) => deleteMember(deleteId));
      // 모든 삭제가 완료되면 첫 페이지로 돌아갑니다.
      Promise.all(deletePromise).then(() => {
        location.href = "#/";
      });
    });
  }
}
