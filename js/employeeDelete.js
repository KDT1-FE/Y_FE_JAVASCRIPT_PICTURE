const AWS_BUCKET_NAME = "lehihobucket";
const AWS_OBJECT_KEY = "data.json";
const s3 = new AWS.S3();

let selectedEmployeeNumbers = [];

function toggleClassOnElement(element, className) {
  element?.classList.toggle(className);
}

document.body.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".staff-box__item");
  if (!clickedItem || !clickedItem.classList.contains("active")) return;

  toggleClassOnElement(clickedItem, "select");

  const empNumber = clickedItem.querySelector(".staff-box__item-id div").textContent;
  if (clickedItem.classList.contains("select")) {
    if (!selectedEmployeeNumbers.includes(empNumber)) {
      selectedEmployeeNumbers.push(empNumber);
    }
  } else {
    const index = selectedEmployeeNumbers.indexOf(empNumber);
    if (index > -1) selectedEmployeeNumbers.splice(index, 1);
  }
});

async function deleteDataFromS3() {
  try {
    const response = await s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: AWS_OBJECT_KEY }).promise();
    const employeesData = JSON.parse(response.Body.toString());

    const employeesToDelete = employeesData.filter((emp) => selectedEmployeeNumbers.includes(String(emp.employeeNumber)));
    const updatedData = employeesData.filter((emp) => !selectedEmployeeNumbers.includes(String(emp.employeeNumber)));

    for (const employee of employeesToDelete) {
      const imageUrl = employee.imageUrl;
      const imageKey = new URL(imageUrl).pathname.slice(1);
      await s3
        .deleteObject({
          Bucket: AWS_BUCKET_NAME,
          Key: imageKey,
        })
        .promise();
    }

    await s3
      .putObject({
        Bucket: AWS_BUCKET_NAME,
        Key: AWS_OBJECT_KEY,
        Body: JSON.stringify(updatedData),
        ContentType: "application/json",
      })
      .promise();
  } catch (error) {
    console.error("Error:", error);
  }
}

document.querySelector(".staff-box__delete").addEventListener("click", async function () {
  document.querySelectorAll(".staff-box__item.active.select").forEach((item) => item.remove());
  await deleteDataFromS3();
  toggleClassOnElement(document.querySelector(".staff-box__delete"), "active");
  toggleClassOnElement(document.querySelector("body"), "masked");
  document.querySelectorAll(".staff-box__item").forEach((item) => {
    item.classList.remove("active");
    item.classList.remove("select");
  });
});

document.querySelector(".employee-delete").addEventListener("click", function () {
  [...document.querySelectorAll(".staff-box__item")].forEach((item) => toggleClassOnElement(item, "active"));
  toggleClassOnElement(document.querySelector("body"), "masked");
  toggleClassOnElement(document.querySelector(".staff-box__delete"), "active");
});


