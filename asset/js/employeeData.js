import { storage, ref, uploadBytes } from "./firebase.js";

let file = $("#img")[0].files[0];
const hasExecuted = localStorage.getItem("hasExecuted");

let englishNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emily",
  "Frank",
  "Grace",
  "Henry",
  "Isabella",
  "Jack",
  "Katherine",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Penelope",
  "Quinn",
  "Ryan",
  "Sophia",
  "Thomas",
  "Ursula",
  "Victoria",
  "William",
  "Xavier",
  "Yvonne",
  "Zoe",
];

// 무작위 핸드폰 번호 생성
function getRandomPhoneNumber() {
  var phoneNumber = "010";
  for (var i = 0; i < 8; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // 0부터 9 사이의 숫자 추가
  }
  return phoneNumber;
}

var randomPhoneNumbers = [];

for (var i = 0; i < englishNames.length; i++) {
  var randomPhoneNumber = getRandomPhoneNumber();
  randomPhoneNumbers.push(randomPhoneNumber);
}
// 첫접속이면
if (!hasExecuted) {
  const promises = [];

  for (let i = 0; i < englishNames.length; i++) {
    let uniqueKey = Date.now().toString();
    const storageRef = ref(storage, "image/" + uniqueKey);
    const uploadPromise = uploadBytes(storageRef, file).then((snapshot) => {
      let userInfo = {
        box: false,
        name: englishNames[i],
        email: englishNames[i] + "@gmail.com",
        phone: randomPhoneNumbers[i],
        classification: "Developer",
        hasImage: false,
        key: uniqueKey,
      };
      localStorage.setItem(uniqueKey, JSON.stringify(userInfo));
    });

    promises.push(uploadPromise);
  }

  // 모든 업로드가 완료된 후에 실행되도록 코드 추가
  Promise.all(promises).then(() => {
    localStorage.setItem("hasExecuted", true);
    window.location.href = "index.html";
  });
}
