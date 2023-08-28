import db from "../../shared/firebase/db.js";
import { collection, addDoc } from "firebase/firestore";

import { createMockData } from "../utils/creatMockData.js";
import { createDriverImg } from "./createDriverImg.js";

export async function createDriverDoc(img, name, birth, product) {
  try {
    // 목업 데이터 생성
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
    // 원하는 Doc id에 imgUrl 데이터 등록
    const driverId = driver.id;

    if (driverId) {
      const redirectUrl = "./main.html";
      createDriverImg(driverId, img, redirectUrl);
    } else throw "404 페이지로";
  } catch (err) {
    console.log(err);
  }
}
