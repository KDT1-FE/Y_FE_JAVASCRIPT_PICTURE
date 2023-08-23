// 보험자 리스트 페이지에서
// 보험자 collection의 각 document field들을 td 요소로 creat하는 Component
export default function createDriverDataTr(driverDoc, driver) {
  const driverData = driverDoc.data();

  // 보험자 사진, 이름, 생년월일, 가입 상품, 가입 기간, 심사 여부 data 불러오기
  const driverImg = driverData.imgUrl;
  const driverName = driverData.name;
  const driverBirth = driverData.birth;
  const driverProduct = driverData.product;
  const driverSubsPeriod = driverData.subsPeriod;
  const driverConfirm = driverData.confirm;

  const driverDataValues = [
    driverImg,
    driverName,
    driverBirth,
    driverProduct,
    driverSubsPeriod,
    driverConfirm
  ];

  // 각 데이터를 원하는 형태로 creat
  driverDataValues.forEach(driverDataValue => {
    const td = document.createElement("td");
    td.classList.add("driverData");

    switch (driverDataValue) {
      case driverImg:
        const img = document.createElement("img");
        img.classList.add("driverImg");
        img.src = driverDataValue;
        img.alt = "보험자 사진";

        td.setAttribute("align", "center");
        td.classList.add("largeWidthData");
        td.append(img);
        break;

      case driverConfirm:
        if (driverDataValue) {
          td.innerText = "심사 완료";
          td.style.color = "orange";
          td.classList.add("largeWidthData");
        } else {
          const confirmAnc = document.createElement("a");
          confirmAnc.classList.add("confirmAnc");
          confirmAnc.setAttribute(
            "href",
            `./confirmAccident.html?${driverDoc.id}`
          );
          confirmAnc.innerText = "심사하기 →";
          confirmAnc.style.color = "white";

          td.classList.add("largeWidthData");
          td.append(confirmAnc);
        }
        break;

      case driverSubsPeriod:
        td.innerText = driverDataValue + " 개월";
        break;

      default:
        td.innerText = driverDataValue;
        break;
    }

    driver.append(td);
  });
}
