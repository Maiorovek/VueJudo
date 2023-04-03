import { addDoc, collection } from "firebase/firestore";
import { database } from "~/server/setting";

const createDocument = async (path, index, data, type, optionsDate) => {
   if (type === 'articles') {
      const {name, page, content, status, category, preview} = data
      await addDoc(collection(database, path), {
         id: index,
         date: new Date().toLocaleString('ru', optionsDate),
         name,
         page,
         content,
         status,
         category,
         preview
      });
   } else if (type === 'categories') {
      await addDoc(collection(database, 'article-categories'), {
         id: index,
         name: data
      });
   }
}

export default createDocument
