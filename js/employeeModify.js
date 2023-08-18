const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal-box");
const form = document.querySelector("form");
const modifyButton = document.querySelector(".modifyButton");
const modifyToogleBtn = document.querySelector(".modal-box__nav__modifyTooglebtn");

const AWS_BUCKET_NAME = "lehihobucket";
const AWS_OBJECT_KEY = "data.json";
const s3 = new AWS.S3();

function toggleClassOnElement(element, className) {
  element?.classList.toggle(className);
}

const toggleEmployeeModify = () => {
  [...document.querySelectorAll(".staff-box__item")].forEach((item) => toggleClassOnElement(item, "modify"));
  toggleClassOnElement(document.querySelector(".modal-box__nav__modifyTooglebtn"), "active");
  toggleClassOnElement(document.querySelector(".staff-box__modify"), "active");
  toggleClassOnElement(document.querySelector(".employee-modify"), "active");
  toggleClassOnElement(document.querySelector(".modifyButton"), "active");
  toggleClassOnElement(document.querySelector(".modifyBtn"), "active");
  toggleClassOnElement(document.querySelector("body"), "masked");
};

const toggleModal = () => {
  toggleClassOnElement(document.querySelector(".modal-box"), "active");
  toggleClassOnElement(document.querySelector(".modal"), "active");
};

document.querySelector(".modal-box__nav__modifyTooglebtn").addEventListener("click", toggleModal);
document.querySelector(".employee-modify").addEventListener("click", toggleEmployeeModify);
document.querySelector(".staff-box__modify").addEventListener("click", toggleEmployeeModify);

async function loadEmployeeDataForEdit(empNumber) {
  const employeeToEdit = await fetchEmployeeData(empNumber);
  if (!employeeToEdit) return;

  populateModalForm(employeeToEdit);
}

function populateModalForm(data) {
  modalBox.querySelector("input[name='employeeNumber']").value = data.employeeNumber;
  modalBox.querySelector("input[name='userName']").value = data.userName;
  modalBox.querySelector("select[name='dept']").value = data.dept;
  modalBox.querySelector("select[name='position']").value = data.position;
  modalBox.querySelector("input[name='userNumber']").value = data.userNumber;
  modalBox.querySelector(".modal-box__inputImg img").src = data.imageUrl || "https://lehihobucket.s3.ap-northeast-2.amazonaws.com/defaultImg.png";
}

async function fetchEmployeeData(empNumber) {
  try {
    const response = await s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: AWS_OBJECT_KEY }).promise();
    const employeesData = JSON.parse(response.Body.toString());
    return employeesData.find((emp) => emp.employeeNumber === parseInt(empNumber, 10));
  } catch (error) {
    console.error("Error loading employee data for edit:", error);
    return null;
  }
}

function createStaffTemplate(data) {
  return `
      <div class="staff-box__item">
          <div class="staff-box__item-id">
              <div>${data.employeeNumber}</div>
          </div>
          <div class="staff-box__item-img">
              <img src="${data.imageUrl}" alt="프로필 사진">

          </div>
          <div class="staff-box__item-detail">
              <ul>
                  <li>${data.userName}</li>
                  <li>${data.dept} / ${data.position}</li>
                  <li>${data.userNumber}</li>
              </ul>
          </div>
      </div>
  `;
}

async function loadStaffData1() {
  try {
    const response = await s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: AWS_OBJECT_KEY }).promise();
    const employeesData = JSON.parse(response.Body.toString());
    const staffBox = document.querySelector(".staff-box");
    staffBox.innerHTML = ""; // clear existing data
    console.log(employeesData);

    if (Array.isArray(employeesData)) {
      employeesData.forEach((employee) => {
        const staffElement = createStaffTemplate(employee);
        staffBox.insertAdjacentHTML("beforeend", staffElement);
      });
    }
  } catch (error) {
    console.error("Error loading staff data:", error);
  }
}

async function updateEmployeeInS3(updatedData) {
  try {
    const response = await s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: AWS_OBJECT_KEY }).promise();
    const employeesData = JSON.parse(response.Body.toString());
    const index = employeesData.findIndex((emp) => emp.employeeNumber === parseInt(updatedData.employeeNumber, 10));

    if (index !== -1) {
      employeesData[index] = updatedData;

      await s3
        .putObject({
          Bucket: AWS_BUCKET_NAME,
          Key: AWS_OBJECT_KEY,
          Body: JSON.stringify(employeesData),
          ContentType: "application/json",
        })
        .promise();
    }
  } catch (error) {
    console.error("Error updating the employee data:", error);
  }
}

modifyButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const updatedData = {};
  formData.forEach((value, key) => (updatedData[key] = value));

  await updateEmployeeInS3(updatedData);
  loadStaffData1();
  form.reset();
});

modifyToogleBtn.addEventListener("click", function () {
  form.reset();
});

document.body.addEventListener("click", async function (event) {
  const clickedItem = event.target.closest(".staff-box__item");

  if (clickedItem && clickedItem.classList.contains("modify")) {
    const empNumber = clickedItem.querySelector(".staff-box__item-id div").textContent;

    await loadEmployeeDataForEdit(empNumber);
    toggleClassOnElement(modal, "active");
    toggleClassOnElement(modalBox, "active");
  }
});
