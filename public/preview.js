
function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
    // FileReader 인스턴스 생성
    const reader = new FileReader();
    // 이미지가 로드가 된 경우
    reader.onload = (e) => {
        const previewImage = document.getElementById("preview-image");
        previewImage.src = e.target.result;
    };
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0]);
    }
}

// input file change 이벤트 부여
const inputImage = document.getElementById("image");
inputImage.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let fileName = file.name;
    const fileData = document.querySelector(".filedata");

    if (fileName) {
        fileData.style.display = "block";
      }
      fileData.innerHTML = fileName;
      console.log(file, fileName);
    
     readImage(e.target);

});