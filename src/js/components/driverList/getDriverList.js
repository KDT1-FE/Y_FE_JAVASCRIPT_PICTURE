import db from "../../db.js";
import { collection, getDocs } from "firebase/firestore";

const driversCollection = await getDocs(collection(db, "drivers"));

try {
  if (driversCollection) {
    driversCollection.forEach(driverDoc => {
      const drivers = document.querySelector("#drivers");
      const driver = document.createElement("tr");
      driver.id = `${driverDoc.id}`;
      driver.classList.add("driver");

      const driverData = driverDoc.data();
      const driverDataValues = [
        driverData.imgUrl,
        driverData.name,
        driverData.birth,
        driverData.product,
        driverData.subsPeriod,
        driverData.done
      ];

      driverDataValues.forEach(driverDataValue => {
        const td = document.createElement("td");
        td.classList.add("driverData");

        if (driverDataValue === driverDataValues[0]) {
          td.setAttribute("align", "center");

          const img = document.createElement("img");
          img.classList.add("driverImg");
          img.src = driverDataValue;
          img.alt = "보험자 사진";

          td.append(img);
        } else if (driverDataValue === false) {
          const confirmAnc = document.createElement("a");
          confirmAnc.classList.add("confirmAnc");
          confirmAnc.setAttribute("href", `./confirm.html?${driverDoc.id}`);
          confirmAnc.innerText = "심사하기 →";

          td.append(confirmAnc);
        } else if (driverDataValue === true) {
          td.innerText = "지급 완료";
        } else {
          td.innerText = driverDataValue;
        }

        driver.append(td);
      });

      const td = document.createElement("td");
      td.classList.add("driverData");
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
