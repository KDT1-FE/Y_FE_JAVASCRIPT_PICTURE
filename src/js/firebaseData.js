import { checkedArr, checked } from "./main.js";

const db = firebase.firestore();
const storage = firebase.storage();

const detailModal = document.querySelector(".detail-modal__background");
const closeIcon = document.querySelector(".close__icon");

readEmployee();
createEmployee();
deleteEmployee();

closeIcon.addEventListener("click", () => {
  detailModal.style.display = "none";
});

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
        // 이미지 업로드 성공 시 firebase에 추가
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
              console.log(result);
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

// 직원 데이터 read
function readEmployee() {
  db.collection("직원")
    .get()
    .then((result) => {
      result.forEach((doc) => {
        const employee = {
          id: doc.id,
          img: doc.data().이미지,
          name: doc.data().이름,
          email: doc.data().이메일,
          tel: doc.data().전화번호,
          date: doc.data().입사날짜,
        };

        createEmployeeElemnet(employee);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// 직원테이블 엘리먼트 생성
function createEmployeeElemnet(employee) {
  const tr = document.createElement("tr");

  const inputTd = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.onclick = checked(checkbox);
  inputTd.append(checkbox);

  const imgTd = document.createElement("td");
  const img = document.createElement("img");
  img.src = employee.img;
  img.className = "employee__img";
  imgTd.append(img);

  const name = document.createElement("td");
  name.innerHTML = employee.name;
  const tel = document.createElement("td");
  tel.innerHTML = employee.tel;
  const email = document.createElement("td");
  email.innerHTML = employee.email;
  const dateTime = document.createElement("td");
  dateTime.innerHTML = employee.date;

  tr.className = "row-data";
  tr.append(inputTd, imgTd, name, email, tel, dateTime);

  // 직원 테이블에 추가
  const employeeTable = document.querySelector(".employee-table");
  employeeTable.append(tr);

  img.addEventListener("click", () => {
    setModal(employee);
  });
}

// 직원 상세 모달
function setModal(employee) {
  console.log(employee);
  detailModal.style.display = "block";
  const detailImg = document.querySelector(".detail__img");
  detailImg.src = employee.img;
  const detailName = document.querySelector(".detail__name");
  detailName.placeholder = employee.name;
  const detailEmail = document.querySelector(".detail__email");
  detailEmail.placeholder = employee.email;
  const detailTel = document.querySelector(".detail__tel");
  detailTel.placeholder = employee.tel;
  const detailDate = document.querySelector(".detail__date");
  detailDate.value = employee.date;

  updateEmployee(employee);
  deleteDetailEmployee(employee);
}

// 직원 데이터 update
function updateEmployee(employee) {
  let imgFile;
  const fileDom = document.querySelector(".update-data__file");
  fileDom.addEventListener("change", () => {
    const imgBox = document.querySelector(".detail__img");

    if (fileDom.files.length) {
      let reader = new FileReader();

      reader.onload = function (e) {
        console.log(e);
        imgBox.src = e.target.result;
      };
      reader.readAsDataURL(fileDom.files[0]);
    } else {
      imgBox.src = "";
    }

    const file = fileDom.files[0];

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
        upload.snapshot.ref.getDownloadURL().then(async (url) => {
          imgFile = url;
        });
      }
    );
  });

  const updateBtn = document.querySelector(".edit__button");

  updateBtn.addEventListener("click", () => {
    const img = document.querySelector(".detail__img");
    const name = document.querySelector(".detail__name");
    const email = document.querySelector(".detail__email");
    const tel = document.querySelector(".detail__tel");
    const date = document.querySelector(".detail__date");

    let newEmployee = {
      이미지: imgFile || img.src,
      이름: name.value || name.placeholder,
      이메일: email.value || email.placeholder,
      전화번호: tel.value || tel.placeholder,
      입사날짜: date.value || date.placeholder,
    };
    console.log(newEmployee);
    db.collection("직원")
      .doc(employee.id)
      .update(newEmployee)
      .then(() => {
        alert("직원 정보가 저장되었습니다.");
        window.location.href = "./index.html";
      });
  });
}

// 직원 상세 모달에서 delete
function deleteDetailEmployee(employee) {
  const deleteBtn = document.querySelector(".delete__button");

  deleteBtn.addEventListener("click", () => {
    db.collection("직원")
      .get()
      .then(async () => {
        await db.collection("직원").doc(employee.id).delete();
        alert("직원 정보가 삭제되었습니다.");
        window.location.href = "./index.html";
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

// checked 직원 데이터 delete
function deleteEmployee() {
  const employeeDeleteBtn = document.querySelector(".employee-delete__button");

  employeeDeleteBtn.addEventListener("click", () => {
    if (checkedArr.length == 0) {
      alert("삭제할 직원을 선택해주세요.");
      return;
    }

    for (let i = 0; i < checkedArr.length; i++) {
      db.collection("직원")
        .where("이메일", "==", `${checkedArr[i]}`)
        .get()
        .then((result) => {
          result.forEach(async (doc) => {
            await db.collection("직원").doc(`${doc.id}`).delete();
            window.location.href = "./index.html";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
}
