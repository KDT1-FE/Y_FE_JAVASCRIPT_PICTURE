import { doc, getDocs, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db, storage } from './firebase'
import { memberConverter } from './FormData'
import { buildHTMLList } from './htmlListBuilder.js'

export function initializeDownload() {
  const membersContainer = document.querySelector('.members__contents')
  console.log(membersContainer)
  const q = query(collection(db, 'members'), orderBy('createdAt'))
  const dataMap = new Map()
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const doc = change.doc
      const id = doc.id

      const memberData = memberConverter.fromFirestore(doc, {})
      memberData.id = id

      // 문서 변화 감지 & HTML 요소 생성 함수 호출
      if (change.type === 'added') {
        const memberRow = buildHTMLList(memberData)
        membersContainer.appendChild(memberRow)
        dataMap.set(id, memberRow) // Map에 추가
      } else if (change.type === 'modified') {
        // const updatedMemberRow = dataMap.get(id);
        // const updatedMemberData = doc.data();
        // 업데이트된 데이터로 DOM 업데이트
        // 예: updatedMemberRow.querySelector('.members__col__name').textContent = updatedMemberData.name;
        // 이와 같은 방식으로 업데이트해야 할 내용을 선택하고 업데이트하십시오.
      } else if (change.type === 'removed') {
        const removedMemberRow = dataMap.get(id)
        membersContainer.removeChild(removedMemberRow)
        dataMap.delete(id) // Map에서 제거
      }
    })
  })
}
