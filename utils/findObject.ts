/**
 * Поиск объекта в массиве по id
 * @param arr изображение
 * @param id изображение
 * @returns {object}
 */

const findObject = (arr: { id: number }[], id: number) => {
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        if (obj.id === id) {
            return obj;
        }
    }
    return null;
};

export default findObject;
