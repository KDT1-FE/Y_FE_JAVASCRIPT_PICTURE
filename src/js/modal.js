/**
 * 간단히 화면에 모달을 보여줄때 사용하는 함수입니다.
 * @param {*} clickedButton 클릭시 모달이 보여질 버튼을 전달해줍니다.
 * @param {*} modalName 클릭하면 나올 모달의 이름을 전달해줍니다.
 * @returns init() function, modalDig
 */
function Modal(clickedButton, modalName) {
  const callBtn = document.querySelector(clickedButton);
  const modal = document.querySelector(modalName);
  const closeBtn = modal.querySelector(".dialog-close");
  return {
    init() {
      const deleteIds = [];
      callBtn.addEventListener("click", (e) => {
        // input 요소 클릭시 모달이 안켜지게 합니다.
        if (e.target.tagName === "INPUT") {
          // 삭제가 필요한 요소들을 배열에 담아 줍니다.
          deleteIds.push(e.target.closest(".grid")?.id);
          return;
        }
        modal.showModal();
        if (e.target.closest(".grid")?.id === undefined) return;
        modal.dispatchEvent(
          new CustomEvent("clickDetailModal", {
            detail: e.target.closest(".grid")?.id,
          }),
        );
      });
      modal.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) modal.close();
      });
      closeBtn.addEventListener("click", () => {
        modal.close();
      });
    },
    modal,
  };
}
export default Modal;
