import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from './firebase'
import { Member, memberConverter } from './FormData'

async function SettingDoc(name, email, team, position, image) {
  const settingRef = doc(db, 'members', 'memberId')
  const settingData = new Member(name, email, team, position, image)
  const firestoreData = memberConverter.toFirestore(settingData)

  const updatedData = {
    ...firestoreData,
    updatedAt: serverTimestamp(), // 서버 타임스탬프 추가
  }
  await setDoc(settingRef, updatedData, { merge: true }) // 덮어쓰기
}

// 설정 버튼 이벤트 분리해야함
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
    await SettingDoc(collection, memberId)
    await removeTask(imgScr)
  }
}
