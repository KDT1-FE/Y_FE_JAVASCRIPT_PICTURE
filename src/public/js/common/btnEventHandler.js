import { removeDB, removeStorage } from './firebaseUtils'

export function handleBtn() {
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', onClickBtn)
}

function onClickBtn(event) {
  event.preventDefault()

  const removeEl = event.target.closest('.remove-btn')
  const updateEl = event.target.closest('.update-btn')

  if (removeEl) {
    handleRemoveAction(removeEl)
  } else if (updateEl) {
    handleUpdateAction(updateEl)
  }
}

function handleRemoveAction(removeEl) {
  const memberRow = removeEl.closest('.members__row')
  const memberId = memberRow.getAttribute('data-id')
  const imgSrc = memberRow.querySelector('img').src
  removeDB(memberId)
    .then(() => removeStorage(imgSrc))
    .catch((error) => console.error('Error during removal:', error))
}

function handleUpdateAction(updateEl) {
  const memberRow = removeEl.closest('.members__row') // 해당 데이터 요소 찾음
  const memberId = memberRow.getAttribute('data-id') // 해당 데이터 아이디값 찾음
  const imgSrc = memberRow.querySelector('img').src // src 가져와서 나중에 삭제해줘야함 필요..!
}
