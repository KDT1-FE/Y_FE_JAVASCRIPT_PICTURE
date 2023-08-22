const selectedElements = document.querySelectorAll(".staff-box__item.active.select");
const selectedEmployeeIDs = [...selectedElements].map((item) => item.getAttribute("data-id"));

function toggleClassOnElement(element, className) {
  element?.classList.toggle(className);
}

document.body.addEventListener("click", function (event) {
  const clickedItem = event.target.closest(".staff-box__item");
  if (!clickedItem || !clickedItem.classList.contains("active")) return;

  toggleClassOnElement(clickedItem, "select");
});

document.querySelector(".employee-delete").addEventListener("click", function () {
  [...document.querySelectorAll(".staff-box__item")].forEach((item) => toggleClassOnElement(item, "active"));
  toggleClassOnElement(document.querySelector("body"), "masked");
  toggleClassOnElement(document.querySelector(".staff-box__delete"), "active");
});

document.querySelector(".staff-box__delete").addEventListener("click", async function () {
  const selectedElements = document.querySelectorAll(".staff-box__item.active.select");
  const selectedEmployeeIDs = [...selectedElements].map((item) => item.getAttribute("data-id"));

  document.querySelectorAll(".staff-box__item.active.select").forEach((item) => item.remove());

  await deleteDataFromFirebase(selectedEmployeeIDs);

  [...document.querySelectorAll(".staff-box__item")].forEach((item) => toggleClassOnElement(item, "active"));
  toggleClassOnElement(document.querySelector("body"), "masked");
  toggleClassOnElement(document.querySelector(".staff-box__delete"), "active");
});

const db = firebase.firestore();
const storage = firebase.storage().ref();

async function deleteDataFromFirebase(selectedEmployeeIDs) {
  try {
    const employeesRef = db.collection("user");

    for (const id of selectedEmployeeIDs) {
      const employeeDoc = await employeesRef.doc(id).get();
      const employeeData = employeeDoc.data();

      if (employeeData && employeeData.imageUrl) {
        const imageUrl = employeeData.imageUrl;
        const cleanUrl = imageUrl.split("?")[0];
        const imageKey = cleanUrl.split("%2F").pop();
        const imageKeyDecoded = decodeURIComponent(imageKey);

        try {
          await storage.child(`image/${imageKeyDecoded}`).delete();
        } catch (error) {
          console.error("Error processing imageUrl for employee:", id, error);
        }
      }

      await employeesRef.doc(id).delete();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
