const db = firebase.firestore();
const storage = firebase.storage();

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

if (!characterId) {
  alert("잘못된 접근입니다");
  history.back();
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

let currentImageURL = "";

function displayCharacterDetails(character) {
  currentImageURL = character.사진;
  document.getElementById("member-image").src = character.사진;
  document.getElementById("member-name").value = character.이름;
  document.getElementById("member-country").value = character.국적;
  document.getElementById("member-birth").value = character.생년월일;
  document.getElementById("member-creator").value = character.제작;
}

const editButton = document.querySelector(".edit-button");

editButton.addEventListener("click", () => {
  const file = document.querySelector(".member-image").files[0];
  const storageRef = storage.ref();

  if (file) {
    const imgPath = storageRef.child("image/" + file.name);
    imgPath
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((path) => {
        updateCharacter(characterId, {
          사진: path,
          이름: document.getElementById("member-name").value,
          국적: document.getElementById("member-country").value,
          생년월일: document.getElementById("member-birth").value,
          제작: document.getElementById("member-creator").value,
        });
      });
  } else {
    updateCharacter(characterId, {
      사진: currentImageURL,
      이름: document.getElementById("member-name").value,
      국적: document.getElementById("member-country").value,
      생년월일: document.getElementById("member-birth").value,
      제작: document.getElementById("member-creator").value,
    });
  }
});

function updateCharacter(id, character) {
  db.collection("character")
    .doc(id)
    .update(character)
    .then(() => {
      alert("캐릭터 수정이 완료 되었습니다.");
      window.location.href = `./about.html?id=${id}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

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
