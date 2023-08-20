// 보험자 리스트 페이지에서
// 체크 박스 input td 요소를 creat하는 Component
import changeTrBackgroundColor from "./clickCheckBox.js";

export default function createCheckBox(driverID, driverTr) {
  const tdCheckBox = document.createElement("td");
  tdCheckBox.classList.add("driverData", "checkData");

  const checkBoxInput = document.createElement("input");
  checkBoxInput.type = "checkbox";
  checkBoxInput.classList.add(`${driverID}`);

  // 체크 박스 선택 시 배경 색상이 바뀌는 클릭 이벤트 추가
  checkBoxInput.addEventListener("click", changeTrBackgroundColor);

  tdCheckBox.append(checkBoxInput);
  driverTr.append(tdCheckBox);
}
