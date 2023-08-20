import db from "../../firebase/db.js";
import { doc, getDoc } from "firebase/firestore";

// 보험자 firestore ID
const driverId = document.location.href.split("?")[1];

// 사고 기록 데이터
const accientRef = doc(db, "drivers", driverId);
const accidentSnap = await getDoc(accientRef);

try {
  if (accidentSnap.exists()) {
    const accident = accidentSnap.data();

    // 보험자 이미지 띄우기
    const driverImg = document.querySelector("#driverImg");
    driverImg.src = accident.imgUrl;

    // 보험자 이름 띄우기
    const driverName = document.querySelector("#driverName");
    driverName.textContent = accident.name;

    // 보험자 사고 사진 띄우기
    const accidentImg = document.querySelector("#accidentImg");
    accidentImg.src = accident.accidentImg;

    // 보험자 사고 날짜 띄우기
    const accidentDate = document.querySelector("#accidentDate");
    accidentDate.textContent = "사고 날짜: " + accident.accidentDate;

    // 보험자 보험금 정보 띄우기
    const expectMoney = document.querySelector(".expectMoney");
    expectMoney.textContent =
      "보험금 [ " + accident.expectMoney + " ] 만 원 지급하기";
  } else {
    throw "driverSnap 존재하지 않습니다.";
  }
} catch (err) {
  // 에러 처리 로직
  console.log(`읽기 실패! : ${err}`);
}
