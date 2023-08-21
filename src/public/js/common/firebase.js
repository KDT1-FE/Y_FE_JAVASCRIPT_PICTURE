import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyC23x__H9jNFl4vGL8Bo0u5qp4W4J97iUI',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'crew-control-service.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'crew-control-service',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'crew-control-service.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '1009210883696',
  appId: process.env.FIREBASE_APP_ID || '1:1009210883696:web:982978404e4f1edc163eb5',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
