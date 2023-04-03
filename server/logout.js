import { getAuth, signOut } from "firebase/auth";

const logoutAuth = () => {
   const auth = getAuth();
   signOut(auth).then(() => {
      console.log('Sign-out successful')
   }).catch((error) => {
      console.error(error)
   })
}

export default logoutAuth
