// CALLING FUNCTIONS
import {
  saveData,
  onGetData,
  deleteData,
  getData,
  updateData,
} from "./firebase.js";

const plantsForm = document.getElementById("plants-form");
const plantsDataContainer = document.getElementById("plants-data-container");
const table = document.querySelector(".list__actual table");

let editStatus = false;
let id = ""; //db ID for elements

// Open modal when "추가" button is clicked
const openModalButton = document.querySelector(".btn-regi");
openModalButton.addEventListener("click", () => {
  // Clear form data and reset edit status
  plantsForm.reset();
  editStatus = false;
  id = "";
  plantsForm["btn-data-save"].innerText = "추가";
  // Open the modal
  document.getElementById("myModal").style.display = "block";
});

// Function to open modal and pre-fill with data
function openEditModal(data) {
  plantsForm["image-data"].value = data.image;
  plantsForm["name-data"].value = data.name;
  plantsForm["date-data"].value = data.date;
  plantsForm["water-time-data"].value = data.waterTime;
  plantsForm["note-data"].value = data.note;
  editStatus = true;
  id = data.id;
  plantsForm["btn-data-save"].innerText = "수정";
  // Open the modal
  document.getElementById("myModal").style.display = "block";
}

//LIST
window.addEventListener("DOMContentLoaded", async () => {
  //GET DATA
  onGetData((querySnapshot) => {
    // list all the data in a div container with inner html
    let html = "";
    querySnapshot.forEach((doc) => {
      const plantData = { id: doc.id, ...doc.data() };
      html += `
                  <div>
                      <table>
                          <tr>
                              <td>${plantData.image}</td>
                              <td>${plantData.name}</td>
                              <td>${plantData.date}</td>
                              <td>${plantData.waterTime}</td>
                              <td>${plantData.note}</td>
                              <td><button class='btn-edit' data-id="${doc.id}">수정</button></td>
                              <td><button class='btn-delete' data-id="${doc.id}">삭제</button></td>
                          </tr>
                      </table>
                  </div>
              `;
    });
    // contains all the elementes
    plantsDataContainer.innerHTML = html;

    // DELETE BUTTON
    //object with all the buttons
    const btnsDelete = plantsDataContainer.querySelectorAll(".btn-delete");
    //select the specific button for DELETE
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteData(dataset.id);
      });
    });

    //EDIT BUTTON
    const btnsEdit = plantsDataContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        const doc = await getData(dataset.id);
        const data = { id: doc.id, ...doc.data() };
        openEditModal(data);
        //bring  values from db
        plantsForm["image-data"].value = data.image;
        plantsForm["name-data"].value = data.name;
        plantsForm["date-data"].value = data.date;
        plantsForm["water-time-data"].value = data.waterTime;
        plantsForm["note-data"].value = data.note;
        editStatus = true;
        id = doc.id;
        plantsForm["btn-data-save"].innerText = "수정";
      });
    });

    // SAVE
    plantsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const image = plantsForm["image-data"];
      const name = plantsForm["name-data"];
      const date = plantsForm["date-data"];
      const waterTime = plantsForm["water-time-data"];
      const note = plantsForm["note-data"];

      if (!editStatus) {
        saveData(
          image.value,
          name.value,
          date.value,
          waterTime.value,
          note.value
        );
        alert("저장되었습니다!");

        // Add a new row to the table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>${image.value}</td>
        <td>${name.value}</td>
        <td>${date.value}</td>
        <td>${waterTime.value}</td>
        <td>${note.value}</td>
        <td><button class='btn-edit' data-id="${doc.id}">수정</button></td>
        <td><button class='btn-delete' data-id="${doc.id}">삭제</button></td>
      `;
        table.appendChild(newRow);
      } else {
        console.log("수정되었습니다!");
        updateData(id, {
          image: image.value,
          name: name.value,
          date: date.value,
          waterTime: waterTime.value,
          note: note.value,
        });
        editStatus = false;
        plantsForm["btn-data-save"].innerText = "저장";

        // Update the edited row in the table
        const editedRow = table.querySelector(`tr[data-id="${doc.id}"]`);
        if (editedRow) {
          editedRow.innerHTML = `
        <td>${image.value}</td>
        <td>${name.value}</td>
        <td>${date.value}</td>
        <td>${waterTime.value}</td>
        <td>${note.value}</td>
        <td><button class='btn-edit' data-id="${doc.id}">수정</button></td>
        <td><button class='btn-delete' data-id="${doc.id}">삭제</button></td>
      `;
        }
      }

      plantsForm.reset();
      // Close the modal
      document.getElementById("myModal").style.display = "none";
    });
  });
});
