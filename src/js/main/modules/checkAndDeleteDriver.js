import { deleteDriver } from "../../shared/firebase/delete/deleteDriver.js";
import { deleteDriverImg } from "../../shared/firebase/delete/deleteDriverImg.js";

export function checkAndDeleteDriver() {
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

            const driverImg =
              deleteDriverTr.getElementsByClassName("driverImg");

            // storage의 이미지 삭제하기
            if (driverImg) {
              const driverImgUrl = driverImg.currentSrc;
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
