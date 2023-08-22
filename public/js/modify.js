const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal-box");
const form = document.querySelector("form");
const modifyButton = document.querySelector(".modifyButton");

const db = firebase.firestore();
const storage = firebase.storage();

function createStaffTemplate(docData, doc) {
  return `
  <div class="staff-box__item" data-id="${doc.id}">
  <div class="staff-box__item-id">
      <div>${docData.employeeNumber}</div>
  </div>
  <div class="staff-box__item-img">
      <img src="${docData.imageUrl}" alt="프로필 사진">
  </div>
  <div class="staff-box__item-detail">
      <ul>
          <li>${docData.userName}</li>
          <li>${docData.dept} / ${docData.position}</li>
          <li>${docData.userNumber}</li>
      </ul>
  </div>
</div>
  `;
}

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

function populateModalForm(data) {
  modalBox.querySelector("input[name='employeeNumber']").value = data.employeeNumber;
  modalBox.querySelector("input[name='userName']").value = data.userName;
  modalBox.querySelector("select[name='dept']").value = data.dept;
  modalBox.querySelector("select[name='position']").value = data.position;
  modalBox.querySelector("input[name='userNumber']").value = data.userNumber;
  modalBox.querySelector(".modal-box__inputImg img").src = data.imageUrl;
}

document.body.addEventListener("click", async function (event) {
  const clickedItem = event.target.closest(".staff-box__item.modify");

  if (clickedItem && clickedItem.classList.contains("modify")) {
    const previouslySelected = document.querySelector(".staff-box__item.modify.select");
    if (previouslySelected) {
      previouslySelected.classList.remove("select");
    }

    clickedItem.classList.add("select");

    const selectedElement = document.querySelector(".staff-box__item.modify.select");
    const docId = selectedElement.getAttribute("data-id");

    fetchDataFromFirebase(docId);

    toggleClassOnElement(modal, "active");
    toggleClassOnElement(modalBox, "active");
  }
});

function fetchDataFromFirebase(docId) {
  const userRef = db.collection("user").doc(docId);

  userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();

        populateModalForm(userData);
      } else {
        console.error("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

modifyButton.addEventListener("click", async function (event) {
  const selectedElement = document.querySelector(".staff-box__item.modify.select");
  const docId = selectedElement.getAttribute("data-id");
  deleteImgFromFirebase([docId]);
  toggleModal();
  event.preventDefault();

  const formData = new FormData(form);
  const updatedData = {};
  formData.forEach((value, key) => (updatedData[key] = value));

  let file = document.querySelector("#image").files[0];
  if (file) {
    let storageRef = storage.ref();
    let savePath = storageRef.child("image/" + file.name);
    let uploadImage = savePath.put(file);

    await new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        null,
        (error) => {
          console.error("실패사유는", error);
          reject(error);
        },
        async () => {
          const url = await uploadImage.snapshot.ref.getDownloadURL();
          updatedData.imageUrl = url;
          resolve();
        }
      );
    });
  }

  const selectedItem = document.querySelector(".staff-box__item.modify.select");
  if (selectedItem) {
    const docId = selectedItem.getAttribute("data-id");
    await updateEmployeeInFirebase(docId, updatedData);
    loadStaffDataForModify();
    form.reset();
  } else {
    console.error("No employee item selected.");
  }
  selectedItem.classList.remove("select");
  [...document.querySelectorAll(".staff-box__item")].forEach((item) => toggleClassOnElement(item, "modify"));
});

async function updateEmployeeInFirebase(docId, data) {
  try {
    await db.collection("user").doc(docId).update(data);
  } catch (error) {
    console.error("Error updating the employee data in Firebase:", error);
  }
}

async function loadStaffDataForModify() {
  try {
    const staffBox = document.querySelector(".staff-box");
    staffBox.innerHTML = ""; // clear existing data
    const snapshot = await db.collection("user").get();
    snapshot.forEach((doc) => {
      const staffElement = createStaffTemplate(doc.data(), doc);
      staffBox.insertAdjacentHTML("beforeend", staffElement);
    });
    [...document.querySelectorAll(".staff-box__item")].forEach((item) => toggleClassOnElement(item, "modify"));
  } catch (error) {
    console.error("Error loading staff data from Firebase:", error);
  }
}

async function deleteImgFromFirebase(selectedEmployeeIDs) {
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
        console.log(imageKeyDecoded);

        try {
          await storage.ref().child(`image/${imageKeyDecoded}`).delete();
        } catch (error) {
          console.error("Error deleting imageUrl for employee:", id, error);
        }
      }
    }
  } catch (error) {
    console.error("Error in deleteImgFromFirebase:", error);
  }
}
