/**
 * Функция задержки вызову функции
 * @param func функция, которую нужно задержать
 * @param delay задержка выполнения функции (мс)
 * @returns {function}
 */

const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
    let timerId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export default debounce;
