import { uploadMember } from './upload'
import { updateMember } from './update'
import { downloadCollection } from '/src/utils/firebaseUtils'
import { handleBtn, handleRemoveAction } from './btnEventHandler'
import { initModal, closeModal, beforeCloseModal } from '/src/utils/modalUtils'
import { setupImagePreview, handlePreviewImg, clearPreviewImage } from '/src/utils/previewimg'
import { formValidation } from '/src/utils/validationUtils'
import { enableForm, readonlyForm } from '/src/utils/formUtils'
import { initDetail } from './detail'
import { removeDB, removeStorage } from '/src/utils/firebaseUtils'

import * as bootstrap from 'bootstrap'
import './members.scss'
import './form.scss'

export async function initMembers() {
  initModal(resetForm)
  await downloadCollection()
  handleBtn(handleRemoveAction)
  detailForm()
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
  const addForm = document.getElementById('addForm')
  const inputEls = addForm.querySelectorAll('.forms.add')
  const selectEl = addForm.querySelector('.form-select.add')
  const fileEl = addForm.querySelector('.input-file.add')
  enableForm(inputEls, selectEl, fileEl)

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

  addForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

    try {
      await uploadMember(addForm, imageInput)
      closeModal(addForm)

      if (imageUrlInfo) {
        imageUrlInfo.revokeImageUrl()
      }
    } catch (error) {
      console.error('Error during form submission: ', error)
    }
  })
}

function toggleButtons(showRmBtn, showCgBtn, showSaveCgBtn, labelTitle) {
  const rmBtn = document.querySelector('.rm-btn')
  const cgBtn = document.querySelector('.cg-btn')
  const saveCgBtn = document.querySelector('.svcg-btn')
  const label = document.getElementById('editModalLabel')

  rmBtn.style.display = showRmBtn ? 'block' : 'none'
  cgBtn.style.display = showCgBtn ? 'block' : 'none'
  saveCgBtn.style.display = showSaveCgBtn ? 'block' : 'none'
  label.innerText = labelTitle ? 'Profile Card' : 'Edit Member'
}

function detailForm() {
  initDetail()

  let memberForUpdate = ''
  let memberId = ''
  let imgSrc = ''

  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', (event) => {
    event.preventDefault()
    const updateEl = event.target.closest('.update-btn')
    if (updateEl) {
      memberForUpdate = updateEl.closest('.members__row')
      memberId = memberForUpdate.getAttribute('data-id')
      imgSrc = memberForUpdate.querySelector('.members-img').src
    }
  })

  const editForm = document.getElementById('editForm')
  const inputEls = editForm.querySelectorAll('.forms.edit')
  const selectEl = editForm.querySelector('.form-select.edit')
  const fileEl = editForm.querySelector('.input-file.edit')
  readonlyForm(inputEls, selectEl, fileEl)

  toggleButtons(true, true, false, true)

  editForm.addEventListener('click', (event) => {
    if (event.target.closest('.cg-btn')) {
      initUpdate(inputEls, selectEl, fileEl, memberId, imgSrc)
      enableForm(inputEls, selectEl, fileEl)
      toggleButtons(false, false, true, false)
    }
    if (event.target.closest('.rm-btn')) {
      removeDB(memberId)
        .then(() => removeStorage(imgSrc))
        .then(() => {
          closeModal(editForm)
        })
        .catch((error) => console.error('Error during removal:', error))
    }
  })
}

function initUpdate(inputEls, selectEl, fileEl, memberId, imgSrc) {
  const id = memberId
  const src = imgSrc
  console.log(id)

  const editForm = document.getElementById('editForm')
  const imageInput = document.getElementById('image')
  const previewImage = document.getElementById('edit-preview')

  setupImagePreview(imageInput, previewImage, (event) => {
    handlePreviewImg(event, previewImage)
  })

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
      await updateMember(id, src, imageInput)
      location.reload()
      location.replace(location.href)
      location.href = location.href
    } catch (error) {
      console.error('Error during form submission: ', error)
    }
  })
  beforeCloseModal(inputEls, selectEl, fileEl)
}
