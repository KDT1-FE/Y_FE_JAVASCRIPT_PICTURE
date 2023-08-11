// 이미지 등록 시
function handleImageChange(event) {
  const imagePreview = document.getElementById("imagePreview");
  const selectedImage = event.target.files[0];

  if (selectedImage) {
    // 이미지 등록 시
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.setAttribute("src", e.target.result); // 등록한 파일로 이미지변경
    };
    reader.readAsDataURL(selectedImage);
  } else {
    // 이미지 등록이 안된 상태는 기본 이미지 출력
    imagePreview.setAttribute("src", "../asset/pictures/no-image.png");
  }
}

// '이전으로' 버튼 기능
const backButton = document.querySelector(".back-button");
backButton.addEventListener("click", () => {
  // window.history.back(); // 브라우저의 이전 페이지로 이동
  window.location.href = "myAlba.html";
});
