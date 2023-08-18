import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { Member, memberConverter } from './FormData'

export async function uploadDB(name, email, team, position, image) {
  let isSubmit = false
  try {
    const collectionRef = collection(db, 'members')
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
