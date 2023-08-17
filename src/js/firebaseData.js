import { checkedArr, checked } from "./main.js";

const db = firebase.firestore();
const storage = firebase.storage();

readEmployee();
createEmployee();
deleteEmployee();

// 직원 데이터 read
function readEmployee() {
  db.collection("직원")
    .get()
    .then((result) => {
      result.forEach(async (doc) => {
        // table에 추가할 직원 element 생성
        const tr = document.createElement("tr");

        const inputTd = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.onclick = checked(checkbox);
        inputTd.append(checkbox);

        const imgTd = document.createElement("td");
        const img = document.createElement("img");
        img.src = await doc.data().이미지;
        img.className = "employee__img";
        imgTd.append(img);

        const name = document.createElement("td");
        name.innerHTML = await doc.data().이름;
        name.className = "employee__name";
        const tel = document.createElement("td");
        tel.innerHTML = await doc.data().전화번호;
        const email = document.createElement("td");
        email.innerHTML = await doc.data().이메일;
        const dateTime = document.createElement("td");
        dateTime.innerHTML = await doc.data().입사날짜;

        // 직원 테이블에 추가
        const employeeTable = document.querySelector(".employee-table");

        employeeTable.append(tr);
        tr.append(inputTd, imgTd, name, email, tel, dateTime);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// 직원 데이터 create
function createEmployee() {
  const employeeForm = document.querySelector("#employee__form");

  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 새로고침 방지

    const file = document.querySelector(`input[type="file"]`).files[0];

    let storageRef = storage.ref();
    let imgUrl = storageRef.child("image/" + file.name);
    let upload = imgUrl.put(file);

    upload.on(
      "state_changed",
      null,
      (error) => {
        console.error(error);
      },
      () => {
        // 업로드 성공 시 firebase에 추가
        upload.snapshot.ref.getDownloadURL().then((url) => {
          const name = document.querySelector(".add-data__name");
          const email = document.querySelector(".add-data__email");
          const tel = document.querySelector(".add-data__tel");
          const date = document.querySelector(".add-data__date");

          let employee = {
            이미지: url,
            이름: name.value,
            이메일: email.value,
            전화번호: tel.value,
            입사날짜: date.value,
          };

          // 직원 등록
          db.collection("직원")
            .add(employee)
            .then((result) => {
              alert("직원 등록이 완료되었습니다.");
              window.location.href = "./index.html";
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  });
}

// 직원 데이터 delete
function deleteEmployee() {
  const employeeDeleteBtn = document.querySelector(".employee-delete__button");

  employeeDeleteBtn.addEventListener("click", () => {
    for (let i = 0; i < checkedArr.length; i++) {
      db.collection("직원")
        .where("이메일", "==", `${checkedArr[i]}`)
        .get()
        .then((result) => {
          result.forEach(async (doc) => {
            await db.collection("직원").doc(`${doc.id}`).delete();
            alert("직원 정보가 삭제되었습니다.");
            window.location.href = "./index.html";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
