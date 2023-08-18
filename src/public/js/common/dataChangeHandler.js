import { downloadCollection } from './firebaseUtils'
import { buildHTMLList } from './htmlListBuilder.js'

export function dataChangeHandler() {
  const membersContainer = document.querySelector('.members__contents')

  downloadCollection((changeType, data, id) => {
    if (changeType === 'added') {
      const memberRow = buildHTMLList(data)
      memberRow.setAttribute('data-id', id) // Set data-id attribute
      membersContainer.appendChild(memberRow)
    } else if (changeType === 'modified') {
      // Update the DOM for modified data if needed
    } else if (changeType === 'removed') {
      // Find and remove the DOM element with the corresponding id
      const removedMemberRow = membersContainer.querySelector(`[data-id="${id}"]`)
      if (removedMemberRow) {
        membersContainer.removeChild(removedMemberRow)
      }
    }
  })
}
