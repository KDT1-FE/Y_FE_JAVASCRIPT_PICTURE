import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore'
import { memberConverter } from './FormData'
import { db } from './firebase'
import { miniMemberList } from './minimembersList'
import { lazyLoad } from './lazy-load'

const collectionName = 'members'

export function miniDownloadCollection() {
  const collectionQuery = query(collection(db, collectionName), orderBy('name'), limit(6))
  const membersContainer = document.querySelector('.members__contents')
  const dataMap = new Map()

  const handleMemberChange = (change) => {
    const doc = change.doc
    const id = doc.id
    const memberData = memberConverter.fromFirestore(doc, {})
    memberData.id = id
    let oldMemerRow = membersContainer.querySelector(`[data-id="${id}"]`)

    if (change.type === 'added' || change.type === 'modified') {
      const memberRow = miniMemberList(memberData)
      memberRow.setAttribute('data-id', id)

      if (oldMemerRow) {
        membersContainer.replaceChild(memberRow, oldMemerRow)
      } else {
        membersContainer.appendChild(memberRow)
      }
      dataMap.set(id, memberData)
    } else if (change.type === 'removed') {
      if (oldMemerRow) {
        membersContainer.removeChild(oldMemerRow)
      }
      dataMap.delete(id)
    }
    lazyLoad()
  }
  const unsubscribe = onSnapshot(collectionQuery, (querySnapshot) => {
    querySnapshot.docChanges().forEach(handleMemberChange)
  })
  return unsubscribe
}
