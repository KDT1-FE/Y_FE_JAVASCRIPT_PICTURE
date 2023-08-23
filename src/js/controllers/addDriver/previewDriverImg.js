const driverImgInput = document.getElementById("driverImg");
const driverImgShowPreview = document.getElementById("driverImgShow");

driverImgInput.addEventListener("change", () => {
  const driverImg = driverImgInput.files[0];
  const fileReader = new FileReader();

  fileReader.onload = ({ target }) => {
    driverImgShowPreview.src = target.result;
  };

  fileReader.readAsDataURL(driverImg);
});
