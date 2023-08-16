// 인풋 클릭 시 포커스
function inputFocusEvent() {
  const defaultBoxes = document.querySelectorAll('.default-input__container');
  defaultBoxes.forEach((defaultBox) => {
    const defaultInput = defaultBox.firstElementChild;
    defaultInput.onfocus = () => {
      defaultBox.classList.add('default-input__container--focus');
    };
    defaultInput.onblur = () => {
      defaultBox.classList.remove('default-input__container--focus');
    };
  });
}

export default inputFocusEvent;
