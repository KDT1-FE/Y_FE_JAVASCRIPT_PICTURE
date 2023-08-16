const db = firebase.firestore();
const employeeTable = document.querySelector(".employee-table");
const employeeAddBtn = document.querySelector(".employee-add__button");
const employeeDeleteBtn = document.querySelector(".employee-remove__button");
const modal = document.querySelector(".modal__background");
const closeIcon = document.querySelector(".close-icon");
const employeeForm = document.querySelector("#employee__form");
const submitBtn = document.querySelector(".submit__button");

readEmployee();
createEmployee();

employeeAddBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  modal.style.display = "none";
});

// firebase read
function readEmployee() {
  db.collection("직원")
    .get()
    .then((result) => {
      result.forEach((doc) => {
        const tr = document.createElement("tr");
        const inputTd = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.onclick = checkBg(checkbox);
        inputTd.append(checkbox);
        const imgTd = document.createElement("td");
        const img = document.createElement("img");
        imgTd.append(img);
        const name = document.createElement("td");
        name.innerHTML = doc.data().이름;
        const tel = document.createElement("td");
        tel.innerHTML = doc.data().전화번호;
        const email = document.createElement("td");
        email.innerHTML = doc.data().이메일;
        const dateTime = document.createElement("td");
        dateTime.innerHTML = doc.data().입사날짜;
        employeeTable.append(tr);
        tr.append(inputTd, imgTd, name, tel, email, dateTime);
      });
    });
}

// firebase create
function createEmployee() {
  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector(".add-data__name");
    const email = document.querySelector(".add-data__email");
    const tel = document.querySelector(".add-data__tel");
    const date = document.querySelector(".add-data__date");

    let employee = {
      이름: name.value,
      이메일: email.value,
      전화번호: tel.value,
      입사날짜: date.value,
    };
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

// checked에 따라 table row 색상 변화
function checkBg(checkbox) {
  checkbox.addEventListener("change", () => {
    console.log(checkbox.checked);
    let td = checkbox.parentNode;
    let tr = td.parentNode;
    tr.style.backgroundColor = checkbox.checked ? "#e17878" : "#fff";
    tr.style.color = checkbox.checked ? "white" : "black";
  });
}

// firebase update
// bucket.doc("bucket_item").update({ name: 'duck2' });

// firebase delete
// employeeDeleteBtn.addEventListener("click", () => {
//   let rowData = new Array();
//   let tdArr = new Array();
//   const checkbox = document.querySelector(".checkbox");
//   let delcheckbox = checkbox.checked;
//   console.log(delcheckbox);

//   checkbox.each((i) => {
//     let tr = checkbox.parent().eq(i);
//     let td = tr.children();

//     rowData.push(tr.text());

//     console.log(rowData);
//   });
//   // db.collection("직원").delete();
// });
