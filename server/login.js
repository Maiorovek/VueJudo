import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { error } from "~/store/error";

const loginAuth = (email, password) => {
   const auth = getAuth();
   // 'admin@admin.com', 'AdminAdminov'
   // 'admin@admin.ru', 'adminadmin123'
   signInWithEmailAndPassword(auth, email, password)
      .then(() => {
         window.location.href = '/admin'
      })
      .catch(errors => {
         error().setErrorAuth(errors.code)
      });
}

export default loginAuth
