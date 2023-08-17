import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'

const collection = 'members'

// Firestore db 삭제하는 함수
async function deleteDocument(collection, memberId) {
  try {
    const memberRef = doc(db, collection, memberId)
    await deleteDoc(memberRef)
  } catch (error) {
    console.error('Error deleting document:', error)
  }
}

// Firestore db 삭제하는 함수 호출
async function deleteMemberDocument(collection, memberId) {
  try {
    await deleteDocument(collection, memberId)
    console.log('Member document deleted successfully')
  } catch (error) {
    console.error('Error deleting member document:', error)
  }
}

// storage 삭제
async function removeTask(imgScr) {
  const storageImgRef = ref(storage, imgScr)

  try {
    await deleteObject(storageImgRef)
    console.log('File deleted successfully')
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}

// 제거 버튼 이벤트
export function handleRemoveBtn(memberId, imgScr) {
  const memberContainer = document.querySelector('.members__contents')
  memberContainer.addEventListener('click', (event) => {
    onClickRemoveBtn(event, memberId, imgScr)
  })
}

async function onClickRemoveBtn(event, memberId, imgScr) {
  event.preventDefault()
  const removeEl = event.target.closest('.remove-btn')
  // const parentElement = removeBtn.parentElement;
  if (removeEl) {
    await deleteMemberDocument(collection, memberId)
    await removeTask(imgScr)
  }
}
