import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from "~/store";

const loginAuth = (email, password) => {
   const auth = getAuth();
   // 'admin@admin.com', 'AdminAdminov'
   // 'admin@admin.ru', 'adminadmin123'
   signInWithEmailAndPassword(auth, email, password)
      .then(() => {
         window.location.href = '/admin'
      })
      .catch(error => {
         useStore().setErrorAuth(error.code)
      });
}

export default loginAuth
