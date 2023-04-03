/**
 * Функция задержки вызову функции
 * @param func функция, которую нужно задержать
 * @param delay задержка выполнения функции (мс)
 * @returns {function}
 */

const debounce = (func, delay) => {
   let timerId;
   return function (...args) {
      if (timerId) {
         clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
         func.apply(this, args);
      }, delay);
   };
}

export default debounce
