// 보험자 리스트 페이지에
// 선택 삭제 버튼을 누르면 보험자 이미지와 데이터를 삭제하는 Component
import deleteDriverImg from "../driverProfile/deleteDriverImg.js";
import deleteDriver from "./deleteDriver.js";

const deleteDriverBtn = document.getElementById("deleteDriver");

deleteDriverBtn
  ? deleteDriverBtn.addEventListener("click", checkDeleteDriver)
  : console.log("404 페이지로");

function checkDeleteDriver() {
  try {
    const checkBoxes = document.querySelectorAll("input[type='checkBox']");

    if (checkBoxes) {
      checkBoxes.forEach(checkBox => {
        if (checkBox.checked) {
          const driverId = checkBox.className;
          const deleteDriverTr = document.getElementById(`${driverId}`);

          if (deleteDriverTr) {
            // 사용자 화면에서 보험자 삭제하기
            deleteDriverTr.remove();
            // db에서 보험자 삭제하기
            deleteDriver(driverId);

            const driverImg = deleteDriverTr.querySelector(".driverImg");

            if (driverImg) {
              const driverImgUrl = driverImg.currentSrc;
              // storage에서 이미지 삭제하기
              deleteDriverImg(driverImgUrl);
            } else throw "404 페이지로";
          } else throw "404 페이지로";
        }
      });
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}
