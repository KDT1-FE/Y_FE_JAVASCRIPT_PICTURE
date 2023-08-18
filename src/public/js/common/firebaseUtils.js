import { doc, deleteDoc, addDoc, setDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, uploadBytesResumable, deleteObject, ref } from 'firebase/storage'
import { Member, memberConverter } from './FormData'
import { db, storage } from './firebase'

const collectionName = 'members'

export function downloadCollection(callback) {
  const q = query(collection(db, collectionName), orderBy('createdAt'))
  console.log('데이터다운로드')

  const dataMap = new Map()
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const doc = change.doc
      const id = doc.id

      const memberData = memberConverter.fromFirestore(doc, {})
      memberData.id = id

      if (change.type === 'added') {
        // 추가된 데이터를 콜백 함수로 전달
        callback('added', memberData, id)
        dataMap.set(id, memberData)
      } else if (change.type === 'modified') {
        // 수정된 데이터를 콜백 함수로 전달
        callback('modified', memberData, id)
        dataMap.set(id, memberData)
      } else if (change.type === 'removed') {
        // 제거된 데이터를 콜백 함수로 전달
        callback('removed', memberData, id)
        dataMap.delete(id)
      }
    })
  })

  return unsubscribe
}

// DB 제거
export async function removeDB(memberId) {
  try {
    console.log('db제거 실행')
    const memberRef = doc(db, collectionName, memberId)
    await deleteDoc(memberRef)
    console.log('Member document deleted successfully')
  } catch (error) {
    console.error('Error deleting member document:', error)
  }
}

// DB 업로드
export async function uploadDB(name, email, team, position, image) {
  let isSubmit = false

  try {
    const collectionRef = collection(db, collectionName)
    const newMemberData = new Member(name, email, team, position, image)

    const memberData = {
      ...newMemberData,
      createdAt: serverTimestamp(),
    }

    await addDoc(collectionRef, memberData, { converter: memberConverter })

    console.log('New member added successfully')
    return (isSubmit = true)
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
    console.log('File deleted successfully')
  } catch (error) {
    console.error('Error deleting file:', error)
  }
}

// 스토리지에 업로드
export async function uploadStorage(file) {
  console.log(file)

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
    // removeDB(memberId)
    console.log('gdd', memberId)
    const memberData = new Member(name, email, team, position, image)
    const firestoreData = memberConverter.toFirestore(memberData)
    const updatedData = {
      ...firestoreData,
      updatedAt: serverTimestamp(),
    }

    await setDoc(docRef, updatedData, { merge: true })

    console.log('Member updated successfully')
  } catch (error) {
    console.error('Error updating member: ', error)
    throw error
  }
}
