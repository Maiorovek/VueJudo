import { deleteDoc, doc } from "firebase/firestore";
import { database } from "~/server/setting";

const deleteDocument = async (path, index) => {
   await deleteDoc(doc(database, path, index));
}

export default deleteDocument
