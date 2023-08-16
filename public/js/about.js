const db = firebase.firestore();

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

if (!characterId) {
  alert("잘못된 접근입니다");
} else {
  fetchCharacterDetails(characterId);
}

function fetchCharacterDetails(id) {
  const characterRef = db.collection("character").doc(id);

  characterRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        displayCharacterDetails(doc.data());
      } else {
        console.error(error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayCharacterDetails(character) {
  document.getElementById("charImage").src = character.사진;
  document.getElementById("charName").textContent = `${character.이름}`;
  document.getElementById(
    "charBirth"
  ).textContent = `생년월일: ${character.생년월일}`;
  document.getElementById(
    "charCountry"
  ).textContent = `국적: ${character.국적}`;
  document.getElementById(
    "charCreator"
  ).textContent = `제작: ${character.제작}`;
}

document.querySelector(".edit-button").addEventListener("click", () => {
  window.location.href = `./edit.html?id=${characterId}`;
});

document.querySelector(".return-button").addEventListener("click", () => {
  window.location.href = "./list.html";
});
