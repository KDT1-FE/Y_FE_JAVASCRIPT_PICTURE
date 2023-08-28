import db from "../../shared/firebase/db.js";
import { doc, getDoc } from "firebase/firestore";

const driverId = document.location.href.split("?")[1];
const accientRef = doc(db, "drivers", driverId);
const accidentSnap = await getDoc(accientRef);

try {
  if (accidentSnap.exists()) {
    const accident = accidentSnap.data();

    const driverImg = document.querySelector("#driverImg");
    driverImg.setAttribute("src", `${accident.imgUrl}`);

    const driverName = document.querySelector("#driverName");
    driverName.textContent = accident.name;

    const accidentImg = document.querySelector("#accidentImg");
    accidentImg.setAttribute("src", `${accident.accidentImg}`);

    const accidentDate = document.querySelector("#accidentDate");
    accidentDate.textContent = "사고 날짜: " + accident.accidentDate;

    const expectMoney = document.querySelector(".expectMoney");
    expectMoney.textContent =
      "보험금 [ " + accident.expectMoney + " ] 만 원 지급하기";
  } else {
    throw "driverSnap 존재하지 않습니다.";
  }
} catch (err) {
  // 에러 처리 로직
}
