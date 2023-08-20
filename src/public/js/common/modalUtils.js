import * as bootstrap from 'bootstrap'

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
