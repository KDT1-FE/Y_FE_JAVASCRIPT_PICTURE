import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { memberConverter } from './FormData'
import { db } from './firebase'
import { miniMemberList } from './minimembersList'
import { lazyLoad } from './lazy-load'

const collectionName = 'members'

export function miniDownloadCollection() {
  const collectionQuery = query(collection(db, collectionName), orderBy('createdAt'))
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
        // 기존 요소가 존재하는 경우 제거하고 새로운 요소를 추가
        membersContainer.replaceChild(memberRow, oldMemerRow)
      } else {
        // 기존 요소가 없는 경우 그냥 추가
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
