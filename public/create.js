const db = firebase.firestore();
const storage = firebase.storage();

const name = document.querySelector(".member-name");
const country = document.querySelector(".member-country");
const birth = document.querySelector(".member-birth");
const creator = document.querySelector(".member-creator");
const createButton = document.querySelector(".create-button");

createButton.addEventListener("click", () => {
  const file = document.querySelector(".member-image").files[0];
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
      window.location.href = "./index.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
