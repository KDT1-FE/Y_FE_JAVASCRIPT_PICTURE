// 보험자 리스트 페이지에서
// 체크 박스가 눌린 리스트의 배경 색상을 변경하는 Component
export default function changeTrBackgroundColor(event) {
  try {
    const checkBox = event.target;
    // 선택 checkBox 요소를 잘 할당받았을 때만 배경 색상 변경
    if (checkBox) {
      const driverID = checkBox.className;
      const driverTrow = document.getElementById(`${driverID}`);

      if (checkBox.checked) {
        driverTrow.style.backgroundColor = "rgba(79, 86, 101, 0.671)";
      } else {
        driverTrow.style.removeProperty("background-color");
      }
    } else {
      throw "404 페이지로";
    }
  } catch (err) {
    console.log("404 페이지로");
  }
}
