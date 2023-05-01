/**
 * Поиск объекта в массиве по id
 * @param arr изображение
 * @param id изображение
 * @returns {object}
 */

const findObject = (arr, id) => {
   for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.id === id) {
         return obj;
      }
   }
   return null;
}

export default findObject
