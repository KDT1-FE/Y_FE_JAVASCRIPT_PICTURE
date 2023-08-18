
function showImg(event) {
  const previewImg = document.getElementById('previewImg');
  const selectedImg = event.target.files[0];

  if (selectedImg) {
    // 새로운 이미지 등록하면 등록한 파일로 src 변경
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(selectedImg);
  } else {
    // 새로운 이미지 등록하지 않으면 디폴트 이미지로 설정
    previewImg.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/artist-photo.appspot.com/o/image%2FNo-Image.png?alt=media&token=3dfa5a87-5480-436b-ac2b-fc81fbec36a8");
  }
}