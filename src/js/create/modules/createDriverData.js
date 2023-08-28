import { getInputData } from "../utils/getInputData.js";
import { createDriverDoc } from "./createDriverDoc.js";

// db에 보험자 데이터 등록
export function createDriverData(event) {
  try {
    // submit 이벤트의 reload 동작 방지
    event.preventDefault();

    // 생년월일이 숫자일 때만 데이터 등록 진행
    const driverBirthInput = document.getElementById("driverBirth");
    if (!isNaN(driverBirthInput.value)) {
      // 더블 클릭으로 인한 중복 업로드 방지
      const addDriverFormSubmit = document.querySelector(
        "input[type='submit']"
      );
      addDriverFormSubmit.setAttribute("disabled", true);

      // ...getInputData() = [보험자_이미지, 보험자_이름, 보험자_생년월일, 보험자_가입_상품명]
      createDriverDoc(...getInputData());
    } else {
      const submitAlert = document.querySelector(".submitAlert");
      submitAlert.textContent = "생년월일은 숫자로만 입력해 주세요.";
    }
  } catch (err) {
    console.log(err);
  }
}
