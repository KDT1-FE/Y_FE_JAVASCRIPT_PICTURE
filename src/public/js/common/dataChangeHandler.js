import { downloadCollection } from './firebaseUtils'
import { buildHTMLList } from './htmlListBuilder.js'

export function dataChangeHandler() {
  const membersContainer = document.querySelector('.members__contents')

  downloadCollection((changeType, data, id) => {
    if (changeType === 'added') {
      const memberRow = buildHTMLList(data)
      memberRow.setAttribute('data-id', id)
      membersContainer.appendChild(memberRow)
    } else if (changeType === 'modified') {
      const memberRow = buildHTMLList(data)
      memberRow.setAttribute('data-id', id)
      membersContainer.appendChild(memberRow)
    } else if (changeType === 'removed') {
      const removedMemberRow = membersContainer.querySelector(`[data-id="${id}"]`)
      if (removedMemberRow) {
        membersContainer.removeChild(removedMemberRow)
      }
    }
  })
}
