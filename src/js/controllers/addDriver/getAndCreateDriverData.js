// driverList 페이지에서
// 보험자 추가 버튼을 눌렸을 때 Data를 Create하는 Component

// Input 요소 data 가져오는 모듈
import getInputData from "./getInputData.js";
// firebase에 driver doc을 추가하는 모듈
import addDriverDoc from "./addDriverDoc.js";
// 사진 미리보기
import previewDriverImg from "./previewDriverImg.js";
previewDriverImg("driverImg", "driverImgShow");

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
      const submitAlert = document.querySelector(".submitAlert");
      submitAlert.textContent = "생년월일은 숫자로만 입력해 주세요.";
    }
  } catch (err) {
    console.log(err);
  }
}
