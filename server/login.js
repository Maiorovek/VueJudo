import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const loginAuth = (email, password) => {
   const auth = getAuth();
   // 'admin@admin.com', 'AdminAdminov'
   signInWithEmailAndPassword(auth, 'admin@admin.com', 'AdminAdminov')
      .then((userCredential) => {
         const user = userCredential.user;
         console.log('Удачно')
      })
      .catch(error => {
         const errorMessage = error.message;
         console.error(errorMessage)
      });
}

export default loginAuth
