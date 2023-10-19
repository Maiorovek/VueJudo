import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { authError } from "~/store/authError";

const loginAuth = (email, password) => {
   const auth = getAuth();
   // 'admin@admin.com', 'AdminAdminov'
   // 'admin@admin.ru', 'adminadmin123'
   signInWithEmailAndPassword(auth, email, password)
      .then(() => {
         window.location.href = '/admin'
      })
      .catch(error => {
         authError().setErrorAuth(error.code)
      });
}

export default loginAuth
