import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/server/setting'

export default () => {
   onAuthStateChanged(auth, (user) => {
      if (!user) {
         window.location.href = '/auth'
      }
   })
}
