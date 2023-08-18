import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadImage(file) {
  console.log(file)

  const fileName = file.name
  const id = Date.now() / fileName.length

  try {
    const storageRef = ref(storage, `images/${fileName}_${id}`)
    const uploadImg = uploadBytesResumable(storageRef, file)

    const snapshot = await uploadImg
    const url = await getDownloadURL(snapshot.ref)

    return url
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}
