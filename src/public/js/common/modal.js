import * as bootstrap from 'bootstrap'
import { initUpload } from './upload'

export function initModal() {
  const openModalButton = document.getElementById('openModal-btn')

  openModalButton.addEventListener('click', async () => {
    try {
      initUpload()

      var myModal = new bootstrap.Modal(document.getElementById('myModal'))

      console.log(myModal._element)

      // 모달이 표시될 때 폼 초기화
      myModal._element.addEventListener('show.bs.modal', function (e) {
        const form = this.querySelector('form')
        if (form) {
          form.reset()
        }
      })

      // 모달 창 띄우기
      myModal.show()
    } catch (error) {
      console.error('Error loading modal:', error)
    }
  })
}
