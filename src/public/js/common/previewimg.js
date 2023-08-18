export function setupImagePreview(imageInput, previewImage) {
  imageInput.addEventListener('change', (event) => {
    handlePreviewImg(event, previewImage)
  })
}

export function handlePreviewImg(event, previewImgEl) {
  console.log('handlePreviewImg called')
  const selectedFile = event.target.files[0]
  try {
    if (!selectedFile) {
      clearPreviewImage(previewImgEl)
      throw new Error('Please select an image.')
    }
    const imageUrl = URL.createObjectURL(selectedFile)
    showPreviewImage(imageUrl, previewImgEl)

    // 이미지 URL 및 해제 함수 반환
    const imageUrlInfo = {
      imageUrl,
      revokeImageUrl: () => {
        URL.revokeObjectURL(imageUrl)
      },
    }

    console.log(imageUrlInfo)
    return imageUrlInfo
  } catch (error) {
    console.error('Error during handlePreviewImg: ', error)
    alert(error.message)
  }
}

export function clearPreviewImage(previewImgEl) {
  previewImgEl.src = ''
  previewImgEl.classList.add('hidden')
}

export function showPreviewImage(imageUrl, previewImgEl) {
  previewImgEl.src = imageUrl
  previewImgEl.classList.remove('hidden')
}
