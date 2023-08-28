export function getInputData() {
  const driverImgInput = document.getElementById("driverImg");
  const driverNameInput = document.getElementById("driverName");
  const driverBirthInput = document.getElementById("driverBirth");
  const insuranceProductInput = document.getElementById("insuranceProduct");

  // 모든 input 요소가 존재하면 input value 배열 반환
  if (
    driverImgInput &&
    driverBirthInput &&
    driverBirthInput &&
    insuranceProductInput
  ) {
    const 보험자_이미지 = driverImgInput.files[0];
    const 보험자_이름 = driverNameInput.value;
    const 보험자_생년월일 = Number(driverBirthInput.value);
    const 보험자_가입_상품명 =
      insuranceProductInput.options[insuranceProductInput.selectedIndex].text;

    return [보험자_이미지, 보험자_이름, 보험자_생년월일, 보험자_가입_상품명];
  } else {
    console.log("404 페이지로");
  }
}
