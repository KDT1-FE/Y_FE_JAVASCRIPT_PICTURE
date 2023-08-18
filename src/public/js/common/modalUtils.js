import * as bootstrap from 'bootstrap'

let myModal

export function openModal() {
  // 모달 객체가 생성되지 않았다면 생성
  if (!myModal) {
    myModal = new bootstrap.Modal(document.getElementById('myModal'))
  }
  myModal.show()
}

export function closeModal() {
  // 모달 객체가 생성되지 않았다면 무시
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

      // 모달 창 띄우기
      openModal()
    } catch (error) {
      console.error('Error loading modal:', error)
    }
  })
}
