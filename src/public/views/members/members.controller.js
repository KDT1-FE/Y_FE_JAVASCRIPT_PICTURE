import '../../js/common/firebase'
import '../../js/common/tooltip'
import '../../js/common/removeDB'
import '../../js/common/FormData'
import '../../js/common/htmlListBuilder'
import { initDownload } from '../../js/common/download'
import { initModal, closeModal } from '../../js/common/modalUtils'
import { setupImagePreview } from '../../js/common/previewimg'
import { enableForm, readonlyForm } from '../../js/common/formUtils'
import { formValidation } from '../../js/common/validationUtils'
import { uploadDB } from '../../js/common/firestoreUtils'
import { uploadImage } from '../../js/common/storageUtils'

import './members.scss'

export async function initMembers() {
  initDownload()
  initModal(resetForm)
  initUpload()
}

// 모달 창 폼 초기화
function resetForm() {
  const form = document.getElementById('myForm')
  if (form) {
    form.reset()
  }
}

function initUpload() {
  // 폼 상태 관리
  const inputEls = document.querySelectorAll('.readonly')
  const selectEl = document.querySelector('select')
  const fileEl = document.querySelector('.input-file')

  enableForm(inputEls, selectEl, fileEl)

  const myForm = document.getElementById('myForm')
  const imageInput = document.getElementById('image')
  const previewImage = document.getElementById('previewImage')

  // 인풋 파일 미리보기 설정
  setupImagePreview(imageInput, previewImage)

  // 유효성 검사 설정
  let isFormValid
  formValidation('#myForm', (isValid) => {
    isFormValid = isValid
  })

  myForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!isFormValid) {
      console.log('유효성 검사 통과못함')
      return
    }
    // 폼 데이터 추출
    const formData = new FormData(myForm)
    const name = formData.get('name').trim()
    const email = formData.get('email').trim()
    const team = formData.get('team').trim()
    const position = formData.get('position')

    try {
      const imageUrlFromStorage = await uploadImage(imageInput.files[0])
      await uploadDB(name, email, team, position, imageUrlFromStorage)

      // 업로드 완료 후 모달 창 닫기
      closeModal()

      // 폼 상태 변경
      // readonlyForm(inputEls, selectEl, fileEl)
    } catch (error) {
      console.error('Error during upload: ', error)
    }
  })
}
