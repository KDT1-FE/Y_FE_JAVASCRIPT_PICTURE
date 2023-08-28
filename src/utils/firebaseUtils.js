import { doc, deleteDoc, addDoc, setDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, uploadBytesResumable, deleteObject, ref } from 'firebase/storage'
import { Member, memberConverter } from './FormData'
import { db, storage } from '/src/api/firebase'
import { buildMemberList } from '../views/members/membersList.js'
import { lazyLoad } from './lazyLoadUtils'
import crypto from 'crypto'

const COLLECTION_NAME = 'members'

// TODO: Map 이용해서 중복요소 생성 방지하기

// 다운로드
export function downloadCollection() {
  const collectionQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt'))
  const membersContainer = document.querySelector('.members__contents')
  const dataMap = new Map()

  const handleMemberChange = (change) => {
    const doc = change.doc
    const id = doc.id
    const memberData = memberConverter.fromFirestore(doc, {})
    const oldMemerRow = membersContainer.querySelector(`[data-id="${id}"]`)

    if (change.type === 'added' || change.type === 'modified') {
      const memberRow = buildMemberList(memberData)
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

// DB 제거
export async function removeDB(memberId) {
  try {
    const memberRef = doc(db, COLLECTION_NAME, memberId)
    await deleteDoc(memberRef)
  } catch (error) {
    console.error('Error deleting member document:', error)
  }
}

// DB 업로드
export async function uploadDB({ name, email, team, position, image }) {
  try {
    const collectionRef = collection(db, COLLECTION_NAME)
    const newMemberData = new Member({ name, email, team, position, image })

    const memberData = {
      ...newMemberData,
      createdAt: serverTimestamp(),
    }

    await addDoc(collectionRef, memberData, { converter: memberConverter })
  } catch (error) {
    console.error('Error adding member: ', error)
    throw error
  }
}

// 스토리지에서 제거
export async function removeStorage(imgSrc) {
  const storageImgRef = ref(storage, imgSrc)
  try {
    await deleteObject(storageImgRef)
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}

// 스토리지에 업로드
export async function uploadStorage(file) {
  const fileName = file.name
  const uniqueId = crypto.createHash('sha256').update(fileName).digest('base64') + '_' + Date.now()

  try {
    const storageRef = ref(storage, `images/${fileName}_${uniqueId}`)
    const uploadImg = uploadBytesResumable(storageRef, file)

    const snapshot = await uploadImg
    const url = await getDownloadURL(snapshot.ref)

    return url
  } catch (error) {
    console.error('Error uploading file: ', error)
    throw error
  }
}

// db 업데이트
export async function updateDB({ id, name, email, team, position, image }) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const memberData = new Member({ name, email, team, position, image })
    // const firestoreData = memberConverter.toFirestore(memberData)
    const updatedData = {
      ...memberData,
      updatedAt: serverTimestamp(),
    }

    await setDoc(docRef, updatedData, { merge: true })
  } catch (error) {
    console.error('Error updating member: ', error)
    throw error
  }
}
