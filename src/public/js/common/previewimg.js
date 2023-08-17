function handlePreviewImg(event, previewImgEl) {
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
export { handlePreviewImg }
