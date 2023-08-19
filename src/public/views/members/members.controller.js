import '../../js/common/firebase'
import '../../js/common/tooltip'
import '../../js/common/FormData'
import '../../js/common/htmlListBuilder'
import { uploadMember } from '../../js/common/upload'
import { updateMember } from '../../js/common/update'
import { removeDB, uploadDB, removeStorage, uploadStorage } from '../../js/common/firebaseUtils'
import { dataChangeHandler } from '../../js/common/dataChangeHandler'
import { handleBtn, handleRemoveAction } from '../../js/common/btnEventHandler'
import { initModal, closeModal } from '../../js/common/modalUtils'
import { setupImagePreview, handlePreviewImg, clearPreviewImage } from '../../js/common/previewimg'
import { formValidation } from '../../js/common/validationUtils'
import { enableForm, readonlyForm } from '../../js/common/formUtils'
import { initDetail } from '../../js/common/detail'

import './members.scss'
import './form.scss'

export async function initMembers() {
  initModal(resetForm)
  dataChangeHandler()
  handleBtn(handleRemoveAction)
  initUpdate()
  initUpload()
}

// 모달 창 폼 초기화
function resetForm() {
  const form = document.getElementById('myForm')
  if (form) {
    form.reset()
  }
  clearPreviewImage(document.querySelector('.preview-img')) // 미리보기 이미지 초기화
}

// 업로드 초기화
function initUpload() {
  initDetail()
  const myForm = document.getElementById('myForm')
  const imageInput = document.getElementById('image')
  const previewImage = document.getElementById('add-preview')

  // 인풋 파일 미리보기 설정
  let imageUrlInfo = {}
  setupImagePreview(imageInput, previewImage, (event) => {
    clearPreviewImage(document.getElementById('add-preview')) // 사진초기화
    imageUrlInfo = handlePreviewImg(event, previewImage) // 사진 등록
  })

  // 유효성 검사 설정
  let isFormValid = ''
  formValidation('#myForm', (isValid) => {
    isFormValid = isValid
  })

  myForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!isFormValid) {
      console.log('유효성 검사 통과못함')
      return
    }

    try {
      await uploadMember(myForm, imageInput, imageUrlInfo)
      // 제출 후 모달 닫기
      closeModal()
      location.reload()
      location.replace(location.href)
      location.href = location.href
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

  let memberId = ''
  let imgSrc = ''
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
    memberId = memberForUpdate.getAttribute('data-id')
    imgSrc = memberForUpdate.querySelector('.members-img').src

    console.log(imgSrc)

    // const updateBtn = document.querySelector('.cg-btn')
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      // 유효성 검사 설정
      let isFormValid = ''
      formValidation('#myForm', (isValid) => {
        isFormValid = isValid
      })

      if (!isFormValid) {
        console.log('유효성 검사 통과못함')
        return
      }

      try {
        await updateMember(memberId, imgSrc, imageInput)

        // 제출 후 모달 닫기
        closeModal()
        location.reload()
        location.replace(location.href)
        location.href = location.href
      } catch (error) {
        console.error('Error during form submission: ', error)
      }
    })
  }
}
