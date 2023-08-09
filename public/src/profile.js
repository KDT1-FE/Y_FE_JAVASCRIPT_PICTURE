const urlParams = new URLSearchParams(window.location.search);
const villagerId = urlParams.get("id");

const storage = firebase.storage();

const imageRef = storage.ref().child(`${villagerId}.webp`);

imageRef
  .getDownloadURL()
  .then((url) => {
    const villagerImageElement = document.getElementById("villager-img");
    villagerImageElement.src = url;
  })
  .catch((error) => {
    console.error("Error getting image download URL:", error);
  });
