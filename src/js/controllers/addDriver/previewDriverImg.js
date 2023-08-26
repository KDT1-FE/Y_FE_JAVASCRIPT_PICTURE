export default function previewDriverImg(imgInput, previewImg) {
  const driverImgInput = document.getElementById(imgInput);
  const driverImgShowPreview = document.getElementById(previewImg);

  driverImgInput.addEventListener("change", () => {
    const driverImg = driverImgInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = ({ target }) => {
      driverImgShowPreview.setAttribute("src", `${target.result}`);
    };

    fileReader.readAsDataURL(driverImg);
  });
}
