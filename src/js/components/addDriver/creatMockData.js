// 목업 데이터 생성하기
export default function createMockData(product) {
  // 보험금 납부 기간 (0~120개월)
  const subsPeriod = Math.floor(Math.random() * 120);
  // 상품 별 월 보험료
  const productPrice = checkProductPrice(product);
  // 보험금 납부 금액  = 보험금 납부 기간 * 상품 별 월 보험료
  const paymentAmount = Math.floor(subsPeriod * productPrice);
  // 사고 날짜
  const accidentDate = createAccidentDate();

  return [subsPeriod, paymentAmount, accidentDate];
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
