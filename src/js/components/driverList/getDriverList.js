import db from "../../db.js";
import { collection, getDocs } from "firebase/firestore";

import changeTrBackgroundColor from "./clickCheckBox.js";

const driversCollection = await getDocs(collection(db, "drivers"));

try {
  if (driversCollection) {
    driversCollection.forEach(driverDoc => {
      const drivers = document.querySelector("#drivers");
      const driver = document.createElement("tr");
      driver.id = `${driverDoc.id}`;
      driver.classList.add("driver");

      // 보험자 삭제용 체크 박스 input td 생성
      const tdCheckBox = document.createElement("td");
      tdCheckBox.classList.add("driverData", "checkData");
      const checkBoxInput = document.createElement("input");
      checkBoxInput.type = "checkbox";
      checkBoxInput.classList.add(`${driverDoc.id}`);

      checkBoxInput.addEventListener("click", changeTrBackgroundColor);

      tdCheckBox.append(checkBoxInput);
      driver.append(tdCheckBox);

      const driverData = driverDoc.data();
      const driverDataValues = [
        driverData.imgUrl,
        driverData.name,
        driverData.birth,
        driverData.product,
        driverData.subsPeriod,
        driverData.confirm
      ];

      driverDataValues.forEach(driverDataValue => {
        const td = document.createElement("td");
        td.classList.add("driverData");

        // 보험자 사진 element 생성
        if (driverDataValue === driverDataValues[0]) {
          td.setAttribute("align", "center");

          const img = document.createElement("img");
          img.classList.add("driverImg");
          img.src = driverDataValue;
          img.alt = "보험자 사진";

          td.classList.add("largeWidthData");

          td.append(img);
        }
        // 보험자 심사 여부 element 생성
        else if (driverDataValue === false) {
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
        } else if (driverDataValue === true) {
          td.innerText = "심사 완료";
          td.style.color = "orange";
          td.classList.add("largeWidthData");
        } else {
          td.innerText = driverDataValue;
        }

        driver.append(td);
      });

      const td = document.createElement("td");
      td.classList.add("driverData", "largeWidthData");
      const driverProfileAnc = document.createElement("a");
      driverProfileAnc.classList.add("driverProfileAnc");
      driverProfileAnc.setAttribute(
        "href",
        `./driverProfile.html?${driverDoc.id}`
      );
      driverProfileAnc.innerText = "프로필 →";
      td.append(driverProfileAnc);
      driver.append(td);
      drivers.append(driver);
    });
  } else {
    throw "driversCollection이 존재하지 않습니다.";
  }
} catch (err) {
  // 에러 처리 로직
  console.log(`읽기 실패! : ${err}`);
}
