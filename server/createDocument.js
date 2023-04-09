import { addDoc, collection } from "firebase/firestore";
import { database } from "~/server/setting";

const createDocument = async (path, data) => {
   await addDoc(collection(database, path), {
      ...data
   });
}

export default createDocument
