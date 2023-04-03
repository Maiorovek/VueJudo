import { doc, updateDoc } from "firebase/firestore";
import { database } from "~/server/setting";

const updateDocument = async (path, data, indexDB, type) => {
   if (type === 'categories') {
      await updateDoc(doc(database, path, indexDB), {
         name: data
      });
   } else if (type === 'articles') {
      const {name, page, content, status, category, preview} = data
      await updateDoc(doc(database, path, data.indexDB), {
         name,
         page,
         category,
         content,
         status,
         preview,
      });
   }
}

export default updateDocument
