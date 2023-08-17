import { uploadImageData } from "./firebase.js";

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
    const imageFrame = document.createElement("img");
    imageFrame.style = `width: 30vw; height: 30vh; background-size: cover`;
    imageFrame.className = "imageFrame";
    imageFrame.src = URL.createObjectURL(selectedImage);
    document.getElementById("image_location").appendChild(imageFrame);
  };
  console.log(child[0]);
  console.log(child.src);

  const targetImage = document.getElementById("image_upload");
  console.log(targetImage);
  console.log(targetImage.files[0]);
  console.log(targetImage.files[0].name);

  // uploadimagedata에서 input element.files[0]에 msg로 넣어준 storage url을
  // enroll.js의 submit에서 찾고, writeuserdata에 인자로 url 같이 보냄
  // writeuserdata 함수 안에서 이미지 url에 해당되는 매개변수 추가해놓기

  uploadImageData(targetImage.files[0], targetImage.files[0].name);
});

const imageForDelete = document.getElementsByClassName(
  "section__enroll--image_delete"
)[0];
imageForDelete.addEventListener("click", function (e) {
  if (child.length > 0) {
    parent.removeChild(child[0]);
  }
});
