export function previewImg() {
  const driverImgShowPreview = document.getElementById("driverImg");
  const driverImg = driverImgInput.files[0];
  const fileReader = new FileReader();

  fileReader.onload = ({ target }) => {
    driverImgShowPreview.setAttribute("src", `${target.result}`);
  };

  fileReader.readAsDataURL(driverImg);
}
