import * as bootstrap from 'bootstrap'
import { enableForm, readonlyForm } from './formUtils'

let myModal

export function openModal() {
  if (!myModal) {
    myModal = new bootstrap.Modal(document.querySelector('.myModal'))
  }
  myModal.show()
}

export function closeModal() {
  if (!myModal) {
    return
  }
  myModal.hide()
}

export function beforeCloseModal(inputEls, selectEl, fileEl) {
  const myModal = new bootstrap.Modal(document.getElementById('editModal'))

  myModal._element.addEventListener('hide.bs.modal', function (event) {
    readonlyForm(inputEls, selectEl, fileEl)
  })
}

export function initModal(formReset) {
  const openModalButton = document.getElementById('openModal-btn')

  openModalButton.addEventListener('click', async () => {
    try {
      formReset()
      openModal()
    } catch (error) {
      console.error('Error loading modal:', error)
    }
  })
}
