import deleteDriver from "./deleteDriver.js";

const deleteDriverBtn = document.querySelector("#deleteDriver");

deleteDriverBtn.addEventListener("click", checkDeleteDriver);

function checkDeleteDriver() {
  const checkBoxes = document.querySelectorAll("input[type='checkBox']");
  checkBoxes.forEach(checkBox => {
    if (checkBox.checked) {
      // 사용자 화면에서 보험자 삭제하기
      const driverId = checkBox.className;
      const deleteDriverTr = document.querySelector(`#${driverId}`);
      deleteDriverTr.remove();

      // db에서 보험자 삭제하기
      deleteDriver(driverId);
    } else {
      console.log("삭제하지 않습니당");
    }
  });
}
