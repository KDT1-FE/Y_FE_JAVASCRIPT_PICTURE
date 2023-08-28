const db = firebase.firestore();
const storage = firebase.storage();

const name = document.querySelector(".member-name");
const country = document.querySelector(".member-country");
const birth = document.querySelector(".member-birth");
const creator = document.querySelector(".member-creator");
const createButton = document.querySelector(".create-button");
const loadingElement = document.querySelector(".loading");
const memberImage = document.querySelector(".member-image");

createButton.addEventListener("click", () => {
  const file = memberImage.files[0];
  const storageRef = storage.ref();
  const imgPath = storageRef.child("image/" + file.name);

  if (
    !file ||
    !name.value ||
    !country.value ||
    !birth.value ||
    !creator.value
  ) {
    alert("모든 정보를 입력해주세요!");
    return;
  }

  loadingElement.style.display = "block";

  imgPath
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((path) => {
      const addChar = {
        사진: path,
        이름: name.value,
        국적: country.value,
        생년월일: birth.value,
        제작: creator.value,
      };

      return db.collection("character").add(addChar);
    })
    .then(() => {
      alert("캐릭터 추가가 완료 되었습니다.");
      window.location.href = "./list.html";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingElement.style.display = "none";
    });
});

document.querySelector(".return-button").addEventListener("click", () => {
  window.location.href = "./list.html";
});

const imageInput = document.querySelector(".member-image");
const imagePreview = document.getElementById("image-preview");

imageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      imagePreview.setAttribute("src", this.result);
      imagePreview.style.display = "block";
    });

    reader.readAsDataURL(file);
  } else {
    imagePreview.style.display = "none";
  }
});
