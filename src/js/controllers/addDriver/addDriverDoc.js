// addDriver 페이지에서
// db에 보험자 데이터 등록하는 모듈
import db from "../../firebase/db.js";
import { collection, addDoc } from "firebase/firestore";

// 목업 데이터 생성 모듈
import createMockData from "./creatMockData.js";
// storage에 이미지 등록하는 모듈
import addDriverImg from "./addDriverImg.js";

export default async function addDriverDoc(img, name, birth, product) {
  try {
    // 목업 데이터 생성하기
    const [subsPeriod, paymentAmount, expectMoney, accidentDate, accidentImg] =
      createMockData(product);

    // 보험자 등록
    const driver = await addDoc(collection(db, "drivers"), {
      imgUrl: "",
      name,
      birth,
      product,
      subsPeriod,
      paymentAmount,
      expectMoney,
      accidentDate,
      accidentImg,
      confirm: false
    });

    // storage에 img 등록 후
    // firestore의 추가된 id에 imgUrl 데이터 등록
    const driverId = driver.id;

    if (driverId) {
      const redirectUrl = "./driverList.html";
      addDriverImg(driverId, img, redirectUrl);
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}
