// imageInput = document.getElementById('image')
// previewImage = document.getElementById('previewImage')

// 이미지 input 이벤트
export function setupImagePreview(imageInput, previewImage) {
  imageInput.addEventListener('change', (event) => {
    handlePreviewImg(event, previewImage)
  })
}
// file -> url 로 바꾼다 :: filestore에서 사용
export function handlePreviewImg(event, previewImgEl) {
  const selectedFile = event.target.files[0]
  try {
    if (!selectedFile) {
      previewImgEl.classList.add('hidden')
      throw new Error('Please select an image.')
    }
    const imageUrl = URL.createObjectURL(selectedFile)
    previewImgEl.src = imageUrl
    previewImgEl.classList.remove('hidden')

    return imageUrl
  } catch (error) {
    alert(error.message)
  }
}
