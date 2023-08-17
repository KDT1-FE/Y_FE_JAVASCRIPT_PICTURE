import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC23x__H9jNFl4vGL8Bo0u5qp4W4J97iUI',
  authDomain: 'crew-control-service.firebaseapp.com',
  projectId: 'crew-control-service',
  storageBucket: 'crew-control-service.appspot.com',
  messagingSenderId: '1009210883696',
  appId: '1:1009210883696:web:982978404e4f1edc163eb5',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
