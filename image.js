const parent = document.getElementById("image_location");
const child = document.getElementsByClassName("imageFrame");
const imageFile = document.getElementById("image_upload");
imageFile.addEventListener("change", function (e) {
  while (child.length > 0) {
    parent.removeChild(child[0]);
  }
  console.log(e.target.files);
  const selectedImage = e.target.files[0];
  const imageReader = new FileReader();
  imageReader.readAsDataURL(selectedImage);

  imageReader.onload = function () {
    const imageFrame = document.createElement("div");
    imageFrame.style = `width: 25vw; height: 25vh; background: url(${imageReader.result}); background-size: cover`;
    imageFrame.className = "imageFrame";
    document.getElementById("image_location").appendChild(imageFrame);
  };
});

function deleteImage() {
  if (child.length > 0) {
    parent.removeChild(child[0]);
  }
}
