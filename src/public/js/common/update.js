import { updateDB, uploadStorage, removeStorage } from './firebaseUtils'

export async function updateMember(memberId, imgSrc, imageInput) {
  // 폼 데이터 추출
  const formData = new FormData(editForm)
  const nameData = formData.get('name').trim()
  const emailData = formData.get('email').trim()
  const teamData = formData.get('team').trim()
  const positionData = formData.get('position')

  // 업데이트 로직 구현
  try {
    const imageUrlFromStorage = await uploadStorage(imageInput.files[0])
    await updateDB(memberId, nameData, emailData, teamData, positionData, imageUrlFromStorage)

    console.log('Member updated successfully')
  } catch (error) {
    console.error('Error during update: ', error)
  }
}
