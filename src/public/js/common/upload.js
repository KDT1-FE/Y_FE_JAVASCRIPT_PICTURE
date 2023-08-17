import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, storage } from './firebase'
import { Member, memberConverter } from './FormData'
import { handlePreviewImg } from './previewimg'
import { setupFormValidation } from './validation'

export function initUpload() {
  console.log('업로드실행')

  const myForm = document.getElementById('myForm')
  myForm.addEventListener('submit', handleSubmit)

  // 이미지 input 이벤트
  const imageInput = document.getElementById('image')
  const previewImage = document.getElementById('previewImage')
  let imageUrl

  imageInput.addEventListener('change', async (event) => {
    imageUrl = await handlePreviewImg(event, previewImage)
  })

  // 폼 유효성 검사 실행
  let isFormValid
  setupFormValidation('#myForm', (isValid) => {
    isFormValid = isValid
  })

  // 폼 제출 핸들러
  async function handleSubmit(event) {
    event.preventDefault()

    // 폼 유효성 검사 결과 확인
    if (!isFormValid) {
      console.log('유효성 검사 통과못함')
      return // 유효성 검사 실패 시 중단
    }

    const formData = new FormData(myForm)
    const name = formData.get('name').trim()
    const email = formData.get('email').trim()
    const team = formData.get('team').trim()
    const position = formData.get('position')

    try {
      // 이미지 업로드 및 URL 획득
      if (imageUrl) {
        const imageUrlFromStorage = await uploadTask(imageInput.files[0])

        // Firestore에 데이터 추가
        await addMemberToFirestore(name, email, team, position, imageUrlFromStorage)

        // 미리보기 및 폼 초기화
        URL.revokeObjectURL(imageUrl)
        previewImage.src = ''
        previewImage.classList.add('hidden')
        myForm.reset()
      } else {
        alert('이미지를 등록해주세요.')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // Firestore에 멤버 데이터 생성 및 추가
  async function addMemberToFirestore(name, email, team, position, image) {
    try {
      const newMemberData = new Member(name, email, team, position, image)

      const collectionRef = collection(db, 'members')
      const memberData = {
        ...newMemberData,
        createdAt: serverTimestamp(),
      }
      await addDoc(collectionRef, memberData, { converter: memberConverter })

      console.log('New member added success')
    } catch (error) {
      console.error('Error adding member: ', error)
      throw error
    }
  }

  // Storage에 이미지 업로드
  async function uploadTask(file) {
    const fileName = file.name // 이름 중복 해결해야함
    try {
      // 폼 유효성 검사 결과 확인
      if (!isFormValid) {
        return // 유효성 검사 실패 시 중단
      }
      const storageRef = ref(storage, `images/${fileName}`)
      const uploadImg = uploadBytesResumable(storageRef, file)

      const snapshot = await uploadImg
      const url = await getDownloadURL(snapshot.ref)
      return url
    } catch (error) {
      console.error('Error uploading file: ', error)
      throw error
    }
  }
}
