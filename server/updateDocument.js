import { doc, updateDoc } from "firebase/firestore";
import { database } from "~/server/setting";

const updateDocument = async (path, data, indexDB) => {
   Reflect.deleteProperty(data, 'indexDB');
   await updateDoc(doc(database, path, indexDB), {
      ...data
   });
}

export default updateDocument
