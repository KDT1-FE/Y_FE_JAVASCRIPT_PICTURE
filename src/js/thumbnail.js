export function createThumb(file) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (event) => {
    const thumbContainer = document.getElementById("img-thumb");
    const img = new Image();
    img.src = event.target.result;
    thumbContainer.innerHTML = "";
    thumbContainer.append(img);
  };
}
