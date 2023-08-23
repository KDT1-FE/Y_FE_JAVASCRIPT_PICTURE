// 보험자 리스트 페이지에
// firebase의 보험자 Collection를 불러와 table Body 요소들을 생성하는 Component
import db from "../../firebase/db.js";
import { collection, getDocs } from "firebase/firestore";

import createCheckBox from "./createCheckBox.js";
import createDriverDataTr from "./createDriverDataTr.js";
import createDriverProfileAnc from "./createDriverProfileAnc.js";

try {
  // firebase의 보험자 Collection 불러오기
  const driversCollection = await getDocs(collection(db, "drivers"));

  // Collection을 잘 불러왔을 때만 driverDoc create
  if (driversCollection) {
    driversCollection.forEach(driverDoc => {
      const driverID = driverDoc.id;

      const driversTbody = document.getElementById("drivers");

      const driverTr = document.createElement("tr");
      driverTr.id = `${driverID}`;
      driverTr.classList.add("driver");

      // Document ID와 driverTr 요소를 잘 할당 했을 때만 요소 creat
      if (driverID && driverTr) {
        // 요소 1. 보험자 삭제용 체크 박스 input td create
        createCheckBox(driverID, driverTr);

        // 요소 2~7. 보험자 사진, 이름, 생년월일, 가입 상품, 가입 기간, 심사 여부 td 요소 create
        createDriverDataTr(driverDoc, driverTr);

        // 요소 8. driverProfile Anchor td 요소 create
        createDriverProfileAnc(driverID, driverTr);
      } else throw "404 페이지로";

      driversTbody.append(driverTr);
    });
  } else throw "404 페이지로";
} catch (err) {
  // 에러 처리 로직
  console.log(err);
}
