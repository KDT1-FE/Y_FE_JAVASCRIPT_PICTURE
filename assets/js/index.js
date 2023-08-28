// CALLING FUNCTIONS
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
  saveData,
  onGetData,
  deleteData,
  getData,
  updateData,
  storageRef,
  uploadTask,
} from "./firebase.js";

const plantsForm = document.getElementById("plants-form");
const plantsDataContainer = document.getElementById("plants-data-container");
const table = document.querySelector(".list__actual table");

// Handle image upload form submission
const imageInput = document.getElementById("imageInput");
const imageContainer = document.getElementById("imageContainer");
const progress = document.getElementById("progress");

let editStatus = false;
let id = ""; //db ID for elements

function searchPlant() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.querySelector(".list__actual table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those that don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; // Index 1 corresponds to the "이름" column
    if (td) {
      txtValue = td.textContent || td.innerText;
      console.log("Works well");
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
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
                            <td><img src="${plantData.image}" class="plant-image"></td>
                            <td id="plant-name">${plantData.name}</td>
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
        //plantsForm["printImage"].value = data.image;
        const imgSrc = document.getElementById("printImage");
        imgSrc.src = data.image;
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
    plantsForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = plantsForm["name-data"];
      const date = plantsForm["date-data"];
      const waterTime = plantsForm["water-time-data"];
      const note = plantsForm["note-data"];

      //IMAGE SAVING
      const imageFile = imageInput.files[0];

      if (!imageFile) {
        if (editStatus) {
          updateData(id, {
            name: name.value,
            date: date.value,
            waterTime: waterTime.value,
            note: note.value,
          });
          editStatus = false;
          plantsForm["btn-data-save"].innerText = "저장";
          plantsForm.reset();

          return;
        }

        alert("이미지를 추가하세요.");
        console.log("no image");
        return;
      }

      const imageStorageRef = storageRef(imageFile.name);
      const imageUploadTask = uploadTask(imageStorageRef, imageFile);

      imageUploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress.textContent = `Uploading: ${percent.toFixed(2)}%`;
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          progress.textContent = "Upload Complete!";
          const downloadURL = await getDownloadURL(
            imageUploadTask.snapshot.ref
          );
          //DATA SAVING
          const image = downloadURL;
          const name = plantsForm["name-data"];
          const date = plantsForm["date-data"];
          const waterTime = plantsForm["water-time-data"];
          const note = plantsForm["note-data"];

          if (!editStatus) {
            saveData(
              image,
              name.value,
              date.value,
              waterTime.value,
              note.value
            );
            // alert("저장되었습니다!");
            // Add a new row to the table
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
      <td><img src="${image}" class="plant-image"></td>
      <td id="plant-name">${name.value}</td>
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
              image: image,
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
      <td><img src="${image}" class="plant-image"></td>
      <td id="plant-name">${name.value}</td>
      <td>${date.value}</td>
      <td>${waterTime.value}</td>
      <td>${note.value}</td>
      <td><button class='btn-edit' data-id="${doc.id}">수정</button></td>
      <td><button class='btn-delete' data-id="${doc.id}">삭제</button></td>
    `;
            }
          }
        }
      );
    });
    plantsForm.reset();
  });
});

function close() {
  setTimeout(function () {
    location.reload();
  }, 200);
}
