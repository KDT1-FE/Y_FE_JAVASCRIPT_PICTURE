import { removeDB, removeStorage } from './firebaseUtils'

export async function handleRemoveBtn(event, memberId, imgSrc) {
  event.preventDefault()
  const removeEl = event.target.closest('.remove-btn')
  if (removeEl) {
    await removeDB(memberId)
    await removeStorage(imgSrc)
  }
}
