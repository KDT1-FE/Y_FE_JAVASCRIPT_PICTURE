import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'

const collection = 'members'

// Firestore db 삭제하는 함수
async function removeDoc(collection, memberId) {
  try {
    const memberRef = doc(db, collection, memberId)
    await deleteDoc(memberRef)
  } catch (error) {
    console.error('Error deleting document:', error)
  }
}

// Firestore db 삭제하는 함수 호출
async function removeMemberDoc(collection, memberId) {
  try {
    await removeDoc(collection, memberId)
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
export async function handleRemoveBtn(event, memberId, imgScr) {
  event.preventDefault()
  console.log('onClickRemoveBtn')
  const removeEl = event.target.closest('.remove-btn')
  if (removeEl) {
    await removeMemberDoc(collection, memberId)
    await removeTask(imgScr)
  }
}
