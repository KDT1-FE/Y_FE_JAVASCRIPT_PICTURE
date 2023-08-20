import { uploadMember } from '../../js/common/upload'
import { updateMember } from '../../js/common/update'
import { downloadCollection } from '../../js/common/firebaseUtils'
import { handleBtn, handleRemoveAction } from '../../js/common/btnEventHandler'
import { initModal, closeModal } from '../../js/common/modalUtils'
import { setupImagePreview, handlePreviewImg, clearPreviewImage } from '../../js/common/previewimg'
import { formValidation } from '../../js/common/validationUtils'
import { enableForm, readonlyForm } from '../../js/common/formUtils'
import { initDetail } from '../../js/common/detail'

import * as bootstrap from 'bootstrap'
import './members.scss'
import './form.scss'

export function initMembers() {
  initModal(resetForm)
  downloadCollection()
  handleBtn(handleRemoveAction)
  initUpdate()
  initUpload()
}

// 폼 초기화
function resetForm() {
  const forms = document.querySelectorAll('.myForm')
  forms.forEach((form) => {
    if (form) {
      form.reset()
    }
    clearPreviewImage(document.querySelector('.preview-img'))
  })
}

// 업로드 초기화
function initUpload() {
  initDetail()
  const myForm = document.getElementById('addForm')
  const imageInput = document.getElementById('image')
  const previewImage = document.getElementById('add-preview')

  // 인풋 파일 미리보기 설정
  setupImagePreview(imageInput, previewImage, (event) => {
    clearPreviewImage(document.getElementById('add-preview')) // 사진 초기화
    imageUrlInfo = handlePreviewImg(event, previewImage) // 사진 등록
  })

  // 유효성 검사 설정
  let isFormValid = ''
  formValidation('#addForm', (isValid) => {
    isFormValid = isValid
  })

  myForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

    try {
      await uploadMember(myForm, imageInput)

      closeModal()
      lazyLoad()

      if (imageUrlInfo) {
        imageUrlInfo.revokeImageUrl()
      }
    } catch (error) {
      console.error('Error during form submission: ', error)
    }
  })
}

function initUpdate() {
  // 폼 상태 관리 -> 수정 가능
  const inputEls = document.querySelectorAll('.forms')
  const selectEl = document.querySelector('select')
  const fileEl = document.querySelector('.input-file')
  enableForm(inputEls, selectEl, fileEl)

  const editForm = document.getElementById('editForm')
  const imageInput = document.getElementById('image')
  const previewImage = document.getElementById('edit-preview')

  // 미리보기 초기화
  let imageUrlInfo = {}
  setupImagePreview(imageInput, previewImage, (event) => {
    imageUrlInfo = handlePreviewImg(event, previewImage)
  })

  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', (event) => {
    event.preventDefault()
    const updateEl = event.target.closest('.update-btn')
    if (updateEl) {
      handleUpdateAction(updateEl)
    }
  })

  const handleUpdateAction = (updateEl) => {
    const memberForUpdate = updateEl.closest('.members__row')
    const memberId = memberForUpdate.getAttribute('data-id')
    const imgSrc = memberForUpdate.querySelector('.members-img').src

    // 유효성 검사 설정
    let isFormValid = ''
    formValidation('#editForm', (isValid) => {
      isFormValid = isValid
    })

    editForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      if (!isFormValid) {
        return
      }

      try {
        await updateMember(memberId, imgSrc, imageInput)
        location.reload()
        location.replace(location.href)
        location.href = location.href
      } catch (error) {
        console.error('Error during form submission: ', error)
      }
    })
  }
}
