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
      callBtn.addEventListener("click", (e) => {
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
