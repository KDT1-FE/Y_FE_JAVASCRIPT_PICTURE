import { uploadDB, uploadStorage } from './firebaseUtils'

export async function uploadMember(myForm, imageInput) {
  const formData = new FormData(myForm)
  const name = formData.get('name').trim()
  const email = formData.get('email').trim()
  const team = formData.get('team').trim()
  const position = formData.get('position')

  try {
    const imageUrlFromStorage = await uploadStorage(imageInput.files[0])
    uploadDB(name, email, team, position, imageUrlFromStorage)
    console.log('Upload completed successfully')
  } catch (error) {
    console.error('Error during upload: ', error)
  }
}
