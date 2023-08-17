import * as bootstrap from 'bootstrap'
import { initUpload } from './upload'

export function initModal() {
  const openModalButton = document.getElementById('openModal-btn')

  openModalButton.addEventListener('click', async () => {
    try {
      initUpload()

      // 모달 창 띄우기
      var myModal = new bootstrap.Modal(document.getElementById('myModal'))
      myModal.show()
    } catch (error) {
      console.error('Error loading modal:', error)
    }
  })
}
