import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
   apiKey: 'AIzaSyC8Ekg822KpT3rAZ0SGVCu18gbBnvlnWj0',
   authDomain: 'diplom-firestore.firebaseapp.com',
   projectId: 'diplom-firestore',
   storageBucket: 'diplom-firestore.appspot.com',
   messagingSenderId: '285445203995',
   appId: '1:285445203995:web:766d877f564d079e3930be'
}

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, database, storage }
