const photoInput = document.getElementById('photoInput');
photoInput.addEventListener('change', (event) => handleImageChange(event));

// 이미지 등록 시 미리보기 기능
const handleImageChange = (event) => {
  const imagePreview = document.getElementById('imagePreview');
  const selectedImage = event.target.files[0];
  let imageURL = '../assets/pictures/no-image.png';
  
  if (selectedImage) {
    // 이미지 등록 시
    imageURL = URL.createObjectURL(selectedImage);
    imagePreview.src = imageURL; // 등록한 파일로 미리보기 주소변경
    imagePreview.onload = () => {
      URL.revokeObjectURL(imageURL); // 이미지가 로드되면 URL 해제
    };
  } 
};
