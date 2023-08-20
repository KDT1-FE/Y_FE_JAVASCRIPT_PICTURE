// Input 요소 data 가져오는 모듈
import getInputData from "./getInputData.js";

// 보험자 추가 버튼 클릭 시 addDriverData 콜백 함수 실행
const addDriverForm = document.getElementById("addDriver");

addDriverForm
  ? addDriverForm.addEventListener("submit", getAndCreateDriverData)
  : console.log("404 페이지로");

// db에 보험자 데이터 등록
function getAndCreateDriverData(event) {
  try {
    // submit 이벤트의 reload 동작 방지
    event.preventDefault();

    const driverBirthInput = document.getElementById("driverBirth");

    // 생년월일이 숫자일 때만 데이터 등록 진행
    if (!isNaN(driverBirthInput.value)) {
      // 더블 클릭으로 인한 중복 업로드 방지
      const addDriverFormSubmit = document.querySelector(
        "input[type='submit']"
      );
      addDriverFormSubmit.setAttribute("disabled", true);
      // Input data [driverImg, driverName, driverBirth, insuranceProduct]를 db에 등록
      addDriverDoc(...getInputData());
    } else {
      throw "404 페이지로";
    }
  } catch (err) {
    console.log(err);
  }
}
