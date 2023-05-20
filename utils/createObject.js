const createObject = (index, data, type) => {
   let newData = {}
   switch (type) {
      case 'categories':
         newData = {
            id: index === null ? data.id : index,
            name: index === null ? data.name : data
         }
         break;
      case 'articles':
         const {name, page, content, status, category, preview} = data
         const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
         };
         newData = {
            ...data,
            id: index === null ? data.id : index,
            date: index === null ? data.date : new Date().toLocaleString('ru', options),
            name,
            page,
            content,
            status,
            category,
            preview
         }
         break;
      case 'events':
         const {start, end} = data
         newData = {
            ...data,
            id: index === null ? data.date : index,
            start,
            end
         }
         break;
      case 'friends':
         console.log(data)
         newData = {
            ...data,
            id: index === null ? data.id : index,
         }
         break;
   }
   return newData
}

export default createObject
