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
        console.log("error 발생");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const charImage = document.getElementById("charImage");
const charName = document.getElementById("charName");
const charBirth = document.getElementById("charBirth");
const charCountry = document.getElementById("charCountry");
const charCreator = document.getElementById("charCreator");

function displayCharacterDetails(character) {
  charImage.src = character.사진;
  charName.textContent = `${character.이름}`;
  charBirth.textContent = `생년월일: ${character.생년월일}`;
  charCountry.textContent = `국적: ${character.국적}`;
  charCreator.textContent = `제작: ${character.제작}`;
}

document.querySelector(".edit-button").addEventListener("click", () => {
  window.location.href = `./edit.html?id=${characterId}`;
});

document.querySelector(".return-button").addEventListener("click", () => {
  window.location.href = "./list.html";
});
