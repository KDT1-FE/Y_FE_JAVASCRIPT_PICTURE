import { uploadImageData } from "./firebase.js";

const parent = document.getElementById("image_location");
const child = document.getElementsByClassName("imageFrame");
const imageFile = document.getElementById("image_upload");
if (imageFile) {
  imageFile.addEventListener("change", function (e) {
    while (child.length > 0) {
      parent.removeChild(child[0]);
    }
    const selectedImage = e.target.files[0];
    const imageReader = new FileReader();
    imageReader.readAsDataURL(selectedImage);

    imageReader.onload = function () {
      const imageFrame = document.createElement("img");
      imageFrame.style = `width: 30vw; height: 30vh; background-size: cover`;
      imageFrame.className = "imageFrame";
      imageFrame.src = URL.createObjectURL(selectedImage);
      document.getElementById("image_location").appendChild(imageFrame);
    };
    const targetImage = document.getElementById("image_upload");
    uploadImageData(targetImage.files[0], targetImage.files[0].name);
  });
}

const imageForDelete = document.getElementsByClassName(
  "section__enroll--image_delete"
)[0];

if (imageForDelete) {
  imageForDelete.addEventListener("click", function (e) {
    if (child.length > 0) {
      parent.removeChild(child[0]);
    }
  });
}
