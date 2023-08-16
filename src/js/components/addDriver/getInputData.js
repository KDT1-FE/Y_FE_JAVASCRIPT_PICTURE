// 보험자 추가 기능의 form Input data 가져오는 모듈

// 보험자 추가 기능의 form Input 요소
const driverImgInput = document.querySelector("#driverImg");
const driverNameInput = document.querySelector("#driverName");
const driverBirthInput = document.querySelector("#driverBirth");
const insuranceProductInput = document.querySelector("#insuranceProduct");

// Input 요소 data 가져오기
export default function getInputData() {
  // 보험자 이미지
  const driverImg = driverImgInput.files[0];
  // 보험자 이름
  const driverName = driverNameInput.value;
  // 보험자 생년월일
  const driverBirth = Number(driverBirthInput.value);
  // 보험자 가입 상품명
  const insuranceProduct =
    insuranceProductInput.options[insuranceProductInput.selectedIndex].text;

  // 모든 input data가 존재하면 Input 요소 data 배열 반환
  if (driverImg && driverName && driverBirth && insuranceProduct) {
    return [driverImg, driverName, driverBirth, insuranceProduct];
  } else {
    // 오류 처리 로직
    return;
  }
}
