import { removeDB, removeStorage } from './firebaseUtils'

export function handleBtn(handleRemoveAction) {
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', (event) => {
    event.preventDefault()
    const removeEl = event.target.closest('.remove-btn')
    if (removeEl) {
      handleRemoveAction(removeEl)
    }
  })
}
export function handleRemoveAction(removeEl) {
  const memberRow = removeEl.closest('.members__row')
  const memberId = memberRow.getAttribute('data-id')
  const imgSrc = memberRow.querySelector('img').src
  removeDB(memberId)
    .then(() => removeStorage(imgSrc))
    .catch((error) => console.error('Error during removal:', error))
}
