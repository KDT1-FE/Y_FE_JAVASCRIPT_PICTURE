// Firestore 데이터베이스 업로드 관련된 기능

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { Member, memberConverter } from './FormData'

// name, email, team, position는 폼 데이터를 가져와야함.
// image는 storage에 업로드 후 가져와야 함.

export async function uploadDB(name, email, team, position, image) {
  try {
    const newMemberData = new Member(name, email, team, position, image)

    const collectionRef = collection(db, 'members')
    const memberData = {
      ...newMemberData,
      createdAt: serverTimestamp(),
    }
    // Firestore에 멤버 데이터 생성 및 추가
    await addDoc(collectionRef, memberData, { converter: memberConverter })

    console.log('New member added successfully')
  } catch (error) {
    console.error('Error adding member: ', error)
    throw error
  }
}
