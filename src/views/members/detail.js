import { showPreviewImage } from '/src/utils/previewimg'

export function initDetail() {
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', handleContainerClick)
}

function handleContainerClick(event) {
  const updateEl = event.target.closest('.update-btn')
  if (updateEl) {
    event.preventDefault()
    handleUpdateAction(updateEl)
  }
}

function handleUpdateAction(updateEl) {
  const memberRow = updateEl.closest('.members__row')
  const imgUrl = memberRow.querySelector('img').src
  const previewImage = document.getElementById('edit-preview')

  const memberInfo = {
    name: memberRow.querySelector('.members__info__name').textContent,
    email: memberRow.querySelector('.members__info__email').textContent,
    position: memberRow.querySelector('.members__position__txt').textContent,
    team: memberRow.querySelector('.members__team__txt').textContent,
  }

  updateFormFields(memberInfo)
  showPreviewImage(imgUrl, previewImage)
}

function updateFormFields(memberInfo) {
  const form = document.getElementById('editForm')
  for (const fieldName in memberInfo) {
    if (Object.hasOwnProperty.call(memberInfo, fieldName)) {
      if (form.elements[fieldName]) {
        form.elements[fieldName].value = memberInfo[fieldName]
      }
    }
  }
}
