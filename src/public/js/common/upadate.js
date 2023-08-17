import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from './firebase'
import { Member, memberConverter } from './FormData'

// 문서 아이디 불러오기

const washingtonRef = doc(db, 'users', '0LG1ULgOH46B4KxC46K1')

const cityData = new Member('Los Angeles', 'CA', 'USA')
const cityFirestoreData = memberConverter.toFirestore(cityData)

const updatedData = {
  ...cityFirestoreData,
  updatedAt: serverTimestamp(), // 서버 타임스탬프 추가
}

await setDoc(washingtonRef, updatedData, { merge: true }) // 덮어쓰기

// 설정 버튼 이벤트
export function settingTooltipItem(memberId, imgScr) {
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', (event) => {
    onClickSettingBtn(event, memberId, imgScr)
  })
}

async function onClickSettingBtn(event, memberId, imgScr) {
  event.preventDefault()
  const settingEl = event.target.closest('.setting-btn')
  if (settingEl) {
    await deleteMemberDocument(collection, memberId)
    await removeTask(imgScr)
  }
}
