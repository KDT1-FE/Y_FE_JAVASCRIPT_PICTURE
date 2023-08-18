import { handleUpdateAction } from './handleUpdateAction'
export async function setMemberInfo() {
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', (event) => {
    event.preventDefault()
    const updateEl = event.target.closest('.update-btn')
    if (updateEl) {
      handleUpdateAction(updateEl)
    }
  })
}
