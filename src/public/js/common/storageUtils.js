// 이미지 업로드와 관련된 기능

import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadImage(file) {
  console.log(file)
  // 고유한 파일명 생성
  const fileName = file.name
  const id = Date.now() / fileName.length

  try {
    // Storage에 이미지 업로드
    const storageRef = ref(storage, `images/${fileName}_${id}`)
    const uploadImg = uploadBytesResumable(storageRef, file)

    const snapshot = await uploadImg
    const url = await getDownloadURL(snapshot.ref)
    // Storage에 업로드된 경로 받아옴 :: firestore 데이터 추가할 때 필요함.
    return url
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}
