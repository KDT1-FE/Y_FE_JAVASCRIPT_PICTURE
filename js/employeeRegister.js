const modalToogleBtn = document.querySelector(".modal-box__nav__tooglebtn");
const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal-box");
const submitBtn = document.getElementById("submitButton");
const registerBtn = document.querySelector(".employee-register");
const form = document.querySelector("form");
const fileInput = document.querySelector('input[type="file"]');

const AWS_BUCKET_NAME = "lehihobucket";
const AWS_OBJECT_KEY = "data.json";

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: "AKIAXJBGLBGEAQLEJURQ",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

// DOM interaction and utility functions
function toggleModal() {
  document.querySelector(".modal-box__inputImg div").textContent = "사진규격 3.5cm x 4.5cm";
  modal.classList.toggle("active");
  modalBox.classList.toggle("active");
}

function resetFormAndCloseModal() {
  form.reset();
  toggleModal();
}

function convertFormToJSON(formElement) {
  const formData = new FormData(formElement);
  let dataObj = {};
  formData.forEach((value, key) => (dataObj[key] = value));
  return dataObj;
}

// AWS S3 interaction functions
async function uploadImageToS3(file) {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: "userImg/" + file.name,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.error("Error uploading the image:", error);
  }
}

async function getLastEmployeeNumber() {
  try {
    const response = await s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: AWS_OBJECT_KEY }).promise();
    const employeesData = JSON.parse(response.Body.toString());

    return !Array.isArray(employeesData) || employeesData.length === 0 ? 20230001 : employeesData[employeesData.length - 1].employeeNumber + 1;
  } catch (error) {
    console.error("Error getting the last employee number:", error);
  }
}

async function updateS3Object(bucketName, objectKey, newData) {
  try {
    const currentDataResponse = await s3.getObject({ Bucket: bucketName, Key: objectKey }).promise();
    const currentData = JSON.parse(currentDataResponse.Body.toString());

    if (!Array.isArray(currentData)) {
      console.error("The existing data in S3 is not an array!");
      return;
    }

    currentData.push(newData);
    await s3
      .putObject({
        Bucket: bucketName,
        Key: objectKey,
        Body: JSON.stringify(currentData),
        ContentType: "application/json",
      })
      .promise();

    console.log("Data added successfully!");
  } catch (error) {
    console.error("Error updating the S3 object:", error);
  }
}

// Event handlers
async function handleFormSubmit(event) {
  event.preventDefault();

  const imageUrl = await uploadImageToS3(fileInput.files[0]);
  if (!imageUrl) {
    console.error("Failed to upload image. Aborting form submission.");
    return;
  }

  const dataObject = convertFormToJSON(form);
  dataObject.imageUrl = imageUrl;
  dataObject.employeeNumber = await getLastEmployeeNumber();

  if (!dataObject.employeeNumber) {
    console.error("Failed to get the last employee number. Aborting form submission.");
    return;
  }

  await updateS3Object(AWS_BUCKET_NAME, AWS_OBJECT_KEY, dataObject);
  resetFormAndCloseModal();
}

// Event listeners
registerBtn.addEventListener("click", toggleModal);
modalToogleBtn.addEventListener("click", resetFormAndCloseModal);
form.addEventListener("submit", handleFormSubmit);

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

async function loadStaffData() {
  try {
    const response = await s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: "data.json" }).promise();
    const employeesData = JSON.parse(response.Body.toString());

    if (Array.isArray(employeesData)) {
      const staffBox = document.querySelector(".staff-box");

      employeesData.forEach((employee) => {
        const staffElement = createStaffTemplate(employee);
        staffBox.insertAdjacentHTML("beforeend", staffElement);
      });
    }
  } catch (error) {
    console.error("Error loading staff data:", error);
  }
}
loadStaffData(); // 페이지 로드 시 함수 호출하여 데이터를 로드

