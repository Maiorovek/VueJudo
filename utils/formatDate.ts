/**
 * Изменение формат даты
 * @param dateStr
 * @param language
 * @returns {string}
 */
const formatDate = (dateStr: string, language: string = 'ru'): string => {
    const formatRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    if (!formatRegex.test(dateStr)) {
        throw new Error(`Invalid date format: ${dateStr}. Expected format: DD.MM.YYYY.`);
    }

    const [dayStr, monthStr, yearStr] = dateStr.split('.');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);

    const date = new Date(year, month, day);
    const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long'};
    return date.toLocaleDateString(language, options);
};

export default formatDate
