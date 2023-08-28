import { doc, deleteDoc, addDoc, setDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, uploadBytesResumable, deleteObject, ref } from 'firebase/storage'
import { Member, memberConverter } from './FormData'
import { db, storage } from '/src/api/firebase'
import { buildHTMLList } from '../views/members/membersList.js'
import { lazyLoad } from './lazyLoadUtils'

const collectionName = 'members'

// 다운로드
export function downloadCollection() {
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
      const memberRow = buildHTMLList(memberData)
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
    const memberRef = doc(db, collectionName, memberId)
    await deleteDoc(memberRef)
  } catch (error) {
    console.error('Error deleting member document:', error)
  }
}

// DB 업로드
export async function uploadDB(name, email, team, position, image) {
  try {
    const collectionRef = collection(db, collectionName)
    const newMemberData = new Member(name, email, team, position, image)

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
  const id = Date.now() / fileName.length

  try {
    const storageRef = ref(storage, `images/${fileName}_${id}`)
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
export async function updateDB(memberId, name, email, team, position, image) {
  try {
    const docRef = doc(db, collectionName, memberId)
    const memberData = new Member(name, email, team, position, image)
    const firestoreData = memberConverter.toFirestore(memberData)
    const updatedData = {
      ...firestoreData,
      updatedAt: serverTimestamp(),
    }

    await setDoc(docRef, updatedData, { merge: true })
  } catch (error) {
    console.error('Error updating member: ', error)
    throw error
  }
}
