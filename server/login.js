import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from "~/store";

const loginAuth = (email, password) => {
   const auth = getAuth();
   // 'admin@admin.com', 'AdminAdminov'
   signInWithEmailAndPassword(auth, email, password)
      .then(() => {
         window.location.href = '/admin'
      })
      .catch(error => {
         useStore().setErrorAuth(error.code)
         // console.log(error)
      });
}

export default loginAuth