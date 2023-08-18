import { removeDB, removeStorage } from './firebaseUtils'

export function handleUpdateBtn() {
  // 이벤트 리스너를 등록하고 나중에 클릭 이벤트 처리
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', onClickRemoveBtn)
}

function onClickRemoveBtn(event) {
  event.preventDefault()
  const removeEl = event.target.closest('.remove-btn')
  if (removeEl) {
    const memberRow = removeEl.closest('.members__row')
    const memberId = memberRow.getAttribute('data-id')
    const imgSrc = memberRow.querySelector('img').src
    removeDB(memberId)
      .then(() => removeStorage(imgSrc))
      .catch((error) => console.error('Error during removal:', error))
  }
}
