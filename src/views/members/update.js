import { updateDB, uploadStorage, removeStorage } from '/src/utils/firebaseUtils'

export async function updateMember(memberId, imgSrc, imageInput) {
  const formData = new FormData(editForm)

  const memberData = {
    id: memberId,
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    team: formData.get('team').trim(),
    position: formData.get('position'),
  }

  try {
    const newImg = imageInput.files[0]
    let imgUrlFromStorage
    if (newImg) {
      imgUrlFromStorage = await uploadStorage(newImg)
      removeStorage(imgSrc)
    } else {
      imgUrlFromStorage = imgSrc
    }
    memberData.image = imgUrlFromStorage
    await updateDB(memberData)
  } catch (error) {
    console.error('Error during update: ', error)
  }
}
