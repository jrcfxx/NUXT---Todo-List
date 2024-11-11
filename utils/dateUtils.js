/**
 * Formats a date string into 'yyyy-MM-dd' format.
 *
 * This function takes a date string, converts it to a Date object, and formats it
 * as a string in the 'yyyy-MM-dd' format.
 *
 * @param {string} myDate - The date string to format. Expected format: 'yyyy-MM-dd'.
 * @returns {string|null} - The formatted date string in 'yyyy-MM-dd' format, or null if the input is invalid.
 */
export function formatDateToYYYYMMDD(myDate) {
    if (!myDate) return null;

    const date = new Date(myDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * Converts a date string from 'yyyy-MM-dd' format to MySQL 'datetime' format.
 *
 * This function takes a date in 'yyyy-MM-dd' format and converts it to a MySQL
 * 'datetime' format, which is 'yyyy-MM-dd hh:mm:ss'.
 *
 * @param {string} myDate - The date string in 'yyyy-MM-dd' format.
 * @returns {string|null} - The formatted date string in 'yyyy-MM-dd hh:mm:ss' format for MySQL, or null if the input is invalid.
 */
export function formatToDatetime(myDate) {
    if (!myDate) return null;

    // Parsing the input date to avoid timezone issues
    const [year, month, day] = myDate.split('-');
    const newDate = new Date(year, month - 1, day); // month - 1 because months are 0-indexed

    // Get the current time (now) and extract hours, minutes, and seconds
    const now = new Date();
    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localSeconds = String(now.getSeconds()).padStart(2, '0');

    // Use the parsed date and append the current time
    const localMonth = String(newDate.getMonth() + 1).padStart(2, '0');
    const localDay = String(newDate.getDate()).padStart(2, '0');

    return `${year}-${localMonth}-${localDay} ${localHours}:${localMinutes}:${localSeconds}`;
}

/**
 * Computes today's date in 'yyyy-MM-dd' format.
 * 
 * @returns {string} - The current date in 'yyyy-MM-dd' format.
 */
export const today = computed(() => {
    return new Date().toLocaleDateString('en-CA');
});