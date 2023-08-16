/**
 * 이미지 업로드하면 썸네일을 만들어주는 함수 입니다.
 * @param {*} file 썸네일을 만들고 싶은 파일을 전달합니다.
 * @param {*} mode [create, update] 모드를 정해줍니다.
 */
export function createThumb(file, mode) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (event) => {
    const thumbContainer = document.getElementById("img-thumb");
    const layer = thumbContainer.querySelector(".layer");
    const oldImg = thumbContainer.querySelector("img");
    const img = new Image();
    img.src = event.target.result;
    if (oldImg) {
      oldImg.remove();
    }
    if (mode === "update") {
      thumbContainer.querySelector("#modifyBtn").classList.remove("hidden");
    }
    thumbContainer.classList.add("aspect-square");
    thumbContainer.insertBefore(img, layer);
    layer.classList.remove("hidden");
    layer.classList.add("flex");
  };
}
