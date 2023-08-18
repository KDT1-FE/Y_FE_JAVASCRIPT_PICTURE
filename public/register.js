const registerButton = document.querySelector("#register-soldier");
const modalEl = document.querySelector(".modal-container");
const modalBg = document.querySelector(".modal-background");
const registerCancelButton = document.querySelector("#close-modal-button");
const previewImage = document.getElementById("preview-image");

const handleModalClose = () => {
  document.body.style.overflow = "";
  modalEl.classList.add("hidden");
  previewImage.src = "";
  previewImage.style.display = "none";
};

registerButton.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  modalEl.classList.remove("hidden");
});

modalBg.addEventListener("click", handleModalClose);
registerCancelButton.addEventListener("click", handleModalClose);

function handleFileUpload(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    previewImage.style.display = "block";
    const reader = new FileReader();
    reader.onload = function (event) {
      previewImage.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  } else {
    previewImage.style.display = "none";
    previewImage.src = "";
  }
}

const modalInputPhoto = document.querySelector(".modal-input-photo");
modalInputPhoto.addEventListener("click", () => {
  const fileInput = document.querySelector("#modal-photo-button");
  fileInput.click();
});

const fileInput = document.querySelector("#modal-photo-button");
fileInput.addEventListener("change", handleFileUpload);

async function createNewDocument() {
  try {
    let file = document.querySelector("#modal-photo-button");
    let storageRef = storage.ref();
    let path = storageRef.child("image/" + file.files[0].name);
    let uploading = path.put(file.files[0]);
    const snapshot = await db.collection("user").get();
    const size = snapshot.size;
    const newIndex = size.toString(); // 새 문서의 인덱스는 현재 문서 개수로 결정

    await uploading.on(
      "state_changed",
      // 변화시
      null,
      // 에러시
      (error) => {
        console.error(error);
      },
      // 성공시
      () => {
        uploading.snapshot.ref.getDownloadURL().then((url) => {
          let 이름 = document.querySelector("#이름");
          let 부서 = document.querySelector("#부서");
          let 직급 = document.querySelector("#직급");
          let 생년월일 = document.querySelector("#생년월일");
          let registerInfo = {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            이름: 이름.value,
            부서: 부서.value,
            직급: 직급.value,
            생년월일: 생년월일.value,
            사진: url,
          };

          db.collection("user").doc(newIndex).set(registerInfo);
          setTimeout(() => {
            alert("업로드하시겠습니까?")
            location.reload();
          }, 500);
        });
      }
    );
  } catch (error) {
    console.error("Error creating document:", error);
  }
}

const confirmButton = document.querySelector("#confirm-modal-button");
confirmButton.addEventListener("click", () => {
    createNewDocument();
});
