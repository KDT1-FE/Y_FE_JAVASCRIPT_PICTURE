import { uploadDB, uploadStorage } from '/src/utils/firebaseUtils'

export async function uploadMember(myForm, imageInput) {
  const formData = new FormData(myForm)

  const memberData = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    team: formData.get('team').trim(),
    position: formData.get('position'),
  }

  try {
    const imageUrlFromStorage = await uploadStorage(imageInput.files[0])
    memberData.image = imageUrlFromStorage
    uploadDB(memberData)
    console.log('Upload completed successfully')
  } catch (error) {
    console.error('Error during upload: ', error)
  }
}
