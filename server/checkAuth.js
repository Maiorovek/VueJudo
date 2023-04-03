import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "~/server/setting";

export default function () {
   console.log(auth)
   // onAuthStateChanged(auth, (user) => {
   //    if (user) {
   //       console.log('User is signed in, see docs for a list of available properties')
   //       const uid = user.uid;
   //    } else {
   //       console.log('User is signed out')
   //    }
   // });
}
