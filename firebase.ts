import {initializeApp} from "firebase/app"
import { getAuth}   from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}

export const firebase_app = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebase_app)
export const firebase_auth = getAuth()
export const firebase_storage = getStorage(firebase_app)

