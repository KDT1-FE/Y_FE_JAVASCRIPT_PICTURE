// addDriver 페이지에서
// 보험자 추가 form의 input value를 가져오는 모듈

// 보험자 추가 form input 요소
const driverImgInput = document.getElementById("driverImg");
const driverNameInput = document.getElementById("driverName");
const driverBirthInput = document.getElementById("driverBirth");
const insuranceProductInput = document.getElementById("insuranceProduct");

// Input 요소 data 가져오기
export default function getInputData() {
  // 모든 input 요소가 존재하면 input value 배열 반환
  if (
    driverImgInput &&
    driverBirthInput &&
    driverBirthInput &&
    insuranceProductInput
  ) {
    // 보험자 이미지
    const driverImg = driverImgInput.files[0];
    // 보험자 이름
    const driverName = driverNameInput.value;
    // 보험자 생년월일
    const driverBirth = Number(driverBirthInput.value);
    // 보험자 가입 상품명
    const insuranceProduct =
      insuranceProductInput.options[insuranceProductInput.selectedIndex].text;

    return [driverImg, driverName, driverBirth, insuranceProduct];
  } else {
    console.log("404 페이지로");
  }
}
