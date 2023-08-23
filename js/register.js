const form = document.querySelector("form");
const fileInput = document.querySelector('input[type="file"]');
const submitButton = document.querySelector(".submitButton");
const staffBox = document.querySelector(".staff-box");

function toggleClassOnElement(element, className) {
  element?.classList.toggle(className);
}

const toggleEmployeeActive = () => {
  toggleClassOnElement(document.querySelector(".modal"), "active");
  toggleClassOnElement(document.querySelector(".modal-box"), "active");
  toggleClassOnElement(document.querySelector(".submitButton"), "active");
  toggleClassOnElement(document.querySelector(".submitBtn"), "active");
  toggleClassOnElement(document.querySelector(".modal-box__nav__submitTooglebtn"), "active");
  form.reset();
  document.querySelector(".modal-box__inputImg").innerHTML = "";
};

document.querySelector(".modal-box__nav__submitTooglebtn").addEventListener("click", toggleEmployeeActive);
document.querySelector(".employee-register").addEventListener("click", toggleEmployeeActive);

const db = firebase.firestore();
const storage = firebase.storage();

$(".submitButton").click(function (event) {
  submitButton.disabled = true;

  event.preventDefault();

  let file = document.querySelector("#image").files[0];
  let storageRef = storage.ref();
  let savePath = storageRef.child("image/" + file.name);
  let uploadImage = savePath.put(file);

  uploadImage.on(
    "state_changed",
    null,
    (error) => {
      console.error("실패사유는", error);
    },
    () => {
      uploadImage.snapshot.ref.getDownloadURL().then((url) => {
        let uploadUserdata = {
          userName: $("#userName").val(),
          employeeNumber: $("#employeeNumber").val(),
          dept: $("#dept").val(),
          position: $("#position").val(),
          userNumber: $("#userNumber").val(),
          imageUrl: url,
          date: new Date(),
        };

        db.collection("user")
          .add(uploadUserdata)
          .then((docRef) => {
            const staffElement = createStaffTemplate(uploadUserdata, docRef);
            staffBox.insertAdjacentHTML("beforeend", staffElement);
            toggleEmployeeActive();
            submitButton.disabled = false;
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
    }
  );
});

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

async function loadStaffData() {
  const snapshot = await db.collection("user").get();
  snapshot.forEach((doc) => {
    const staffElement = createStaffTemplate(doc.data(), doc);
    staffBox.insertAdjacentHTML("beforeend", staffElement);
  });
}

loadStaffData();
