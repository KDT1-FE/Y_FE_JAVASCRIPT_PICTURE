// db에 보험자 데이터 등록
import db from "../../db.js";
import { collection, addDoc } from "firebase/firestore";

// Input 요소 data 가져오는 모듈
import getInputData from "./getInputData.js";
// 목업 데이터 생성 모듈
import createMockData from "./creatMockData.js";

import addDriverImg from "./addDriverImg.js";

// 보험자 추가 form 요소
const addDriverForm = document.querySelector("#addDriver");

// 보험자 추가 버튼 클릭 시 보험자 데이터 등록
addDriverForm.addEventListener("submit", addDriver);

// db에 보험자 데이터 등록
function addDriver(event) {
  try {
    // submit 이벤트의 reload 동작 방지
    event.preventDefault();
    // Input data [driverImg, driverName, driverBirth, insuranceProduct]를 db에 등록
    addDriverDoc(...getInputData());
  } catch (err) {
    console.log(`Can not add Data: ${err}`);
  }
}

// db에 보험자 데이터 등록
async function addDriverDoc(img, name, birth, product) {
  try {
    // 목업 데이터 생성하기
    const [subsPeriod, paymentAmount, accidentDate] = createMockData(product);

    // 보험자 등록
    const driver = await addDoc(collection(db, "drivers"), {
      imgUrl: "",
      name,
      birth,
      product,
      subsPeriod,
      paymentAmount,
      accidentDate,
      done: false
    });

    // storage에 img 등록 후
    // firestore의 추가된 id에 imgUrl 데이터 등록
    const driverId = driver.id;

    if (driverId) {
      addDriverImg(driverId, img);
    } else {
      // 오류 처리 로직
      return;
    }
  } catch (err) {
    // 오류 처리 로직
    // console.log(`Can not add Data: ${err}`);
  }
}
