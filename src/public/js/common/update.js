import { updateDB, uploadStorage, removeStorage } from './firebaseUtils'

export async function updateMember(memberId, imgSrc, imageInput) {
  const formData = new FormData(editForm)
  const nameData = formData.get('name').trim()
  const emailData = formData.get('email').trim()
  const teamData = formData.get('team').trim()
  const positionData = formData.get('position')

  try {
    const newImg = imageInput.files[0]
    let imgUrlFromStorage
    if (newImg) {
      imgUrlFromStorage = await uploadStorage(newImg)
      removeStorage(imgSrc)
    }
    await updateDB(memberId, nameData, emailData, teamData, positionData, imgUrlFromStorage)
  } catch (error) {
    console.error('Error during update: ', error)
  }
}
