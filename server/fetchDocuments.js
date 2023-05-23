import { collection, onSnapshot } from "firebase/firestore";
import { database } from "~/server/setting";

const fetchDocuments = async (collectionName, callback) => {
   await onSnapshot(collection(database, collectionName), querySnapshot => {
      querySnapshot.forEach(doc => {
         callback(doc);
      });
   });

}

export default fetchDocuments
