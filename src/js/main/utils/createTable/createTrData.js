export function createTrData(driverTr, driverDoc) {
  const driverData = driverDoc.data();
  const driverId = driverDoc.id;

  // 보험자 사진, 이름, 생년월일, 가입 상품, 가입 기간, 심사 여부 data 불러오기
  const driverDataValues = [
    driverData.imgUrl,
    driverData.name,
    driverData.birth,
    driverData.product,
    driverData.subsPeriod,
    driverData.confirm
  ];

  // 각 데이터를 원하는 형태로 creat
  driverDataValues.forEach(driverDataValue => {
    const td = document.createElement("td");
    td.classList.add("driverData");

    switch (driverDataValue) {
      case driverData.imgUrl:
        createDriverImg(driverDataValue, td);
        break;

      case driverData.confirm:
        createConfirmText(driverDataValue, driverId, td);
        break;

      case driverData.subsPeriod:
        td.innerText = driverDataValue + " 개월";
        break;

      default:
        td.innerText = driverDataValue;
        break;
    }

    driverTr.append(td);
  });
}

function createDriverImg(driverImg, td) {
  const img = document.createElement("img");
  img.classList.add("driverImg");
  img.src = driverImg;
  img.alt = "보험자 사진";

  td.setAttribute("align", "center");
  td.classList.add("largeWidthData");

  td.append(img);
}

function createConfirmText(driverConfirm, driverId, td) {
  if (driverConfirm) {
    td.innerText = "심사 완료";
    td.style.color = "orange";
    td.classList.add("largeWidthData");
  } else {
    const confirmAnc = document.createElement("a");
    confirmAnc.classList.add("confirmAnc");
    confirmAnc.setAttribute("href", `./confirm.html?${driverId}`);
    confirmAnc.innerText = "심사하기 →";
    confirmAnc.style.color = "white";

    td.classList.add("largeWidthData");
    td.append(confirmAnc);
  }
}
