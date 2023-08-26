// addDriver 페이지에서
// db에 보험자 데이터 등록하기 전 목업 데이터 생성하는 모듈
export default function createMockData(product) {
  if (product) {
    const 보험료_납부_기간 = Math.floor(Math.random() * 120);
    const 상품_별_월_보험료 = checkProductPrice(product);
    const 보험료_납부_금액 = Math.floor(보험료_납부_기간 * 상품_별_월_보험료);
    const 예상_보험금_금액 = Math.floor(보험료_납부_금액 * 3);
    const 사고_날짜 = createAccidentDate();
    const 사고_사진 =
      "https://firebasestorage.googleapis.com/v0/b/zero-car.appspot.com/o/accidentImgs%2F%E1%84%8E%E1%85%A1%E1%84%85%E1%85%A3%E1%86%BC%20%E1%84%89%E1%85%A1%E1%84%80%E1%85%A9%20%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB.jpeg?alt=media&token=6d3cec2a-77b9-40c4-8559-c914a0414f25";

    return [
      보험료_납부_기간,
      보험료_납부_금액,
      예상_보험금_금액,
      사고_날짜,
      사고_사진
    ];
  } else {
    console.log("404 페이지로");
  }
}

// 상품 별 월 보험료 확인
function checkProductPrice(product) {
  switch (product) {
    case "현대해상 운전자 보험":
      return 2;

    case "삼성화재 운전자 보험":
      return 3;

    case "매리츠 운전자 보험":
      return 1;

    default:
      return 2;
  }
}

// 보험자 추가 시간 = 가짜 사고 시간
function createAccidentDate() {
  const today = new Date();

  // 사고 날짜 데이터
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;

  // 사고 시간 데이터
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const timeString = hours + ":" + minutes;

  return dateString + " " + timeString;
}
