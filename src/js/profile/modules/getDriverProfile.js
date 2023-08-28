import db from "../../shared/firebase/db.js";
import { doc, getDoc } from "firebase/firestore";

const driverId = document.location.href.split("?")[1];

const driverRef = doc(db, "drivers", driverId);
const driverSnap = await getDoc(driverRef);

try {
  if (driverSnap.exists()) {
    const driver = driverSnap.data();

    // 보험자 이미지 띄우기
    const driverImg = document.getElementById("driverImg");
    driverImg.src = driver.imgUrl;

    // 보험자 이름 띄우기
    const driverNameInput = document.querySelector("#driverName input");
    driverNameInput.value = driver.name;

    // 보험자 생년월일 띄우기
    const driverBirth = document.getElementById("driverBirth");
    driverBirth.textContent = driver.birth;

    // 보험자 보험 상품 정보 띄우기
    const product = document.getElementById("product");
    const subsPeriod = document.getElementById("subsPeriod");
    const paymentAmount = document.getElementById("paymentAmount");
    product.textContent = driver.product;
    subsPeriod.textContent = driver.subsPeriod + " 개월";
    paymentAmount.textContent = driver.paymentAmount + " 만 원";
  } else {
    // 에러 처리 로직
  }
} catch (err) {
  // 에러 처리 로직
}
