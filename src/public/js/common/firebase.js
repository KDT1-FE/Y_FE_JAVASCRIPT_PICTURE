import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyC23x__H9jNFl4vGL8Bo0u5qp4W4J97iUI',
  apiKey: process.env.FIREBASE_API_KEY || 'crew-control-service.firebaseapp.com',
  apiKey: process.env.FIREBASE_API_KEY || 'crew-control-service',
  apiKey: process.env.FIREBASE_API_KEY || 'crew-control-service.appspot.com',
  apiKey: process.env.FIREBASE_API_KEY || '1009210883696',
  apiKey: process.env.FIREBASE_API_KEY || '1:1009210883696:web:982978404e4f1edc163eb5',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
