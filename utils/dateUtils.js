import { useTaskStore } from '~/store/taskStore';

/**
 * Validates the completeness date to ensure it is not set in the future.
 *
 * @param {string} completeness_date - The completion date to validate.
 * @returns {string|null} - Returns an error message if the date is in the future, otherwise null.
 */
export function validateCompletenessDate(completeness_date) {
    // Get today's date with hours set to 00:00:00 for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the completeness date is provided and if it is in the future
    if (completeness_date && new Date(completeness_date) > today) {
        return 'The completeness date cannot be in the future.';
    }

    // If no error, return null
    return null;
}

/**
 * Formats a date string into 'yyyy-MM-dd' format, or returns '-' if no date is provided.
 *
 * @param {string} myDate - The date string to format.
 * @returns {string} - The formatted date string in 'yyyy-MM-dd' format or '-' if the input is invalid.
 */
export function formatDateToYYYYMMDD(myDate) {
    const date = new Date(myDate);

    if (!myDate) return '-';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * Converts a date string from 'yyyy-MM-dd' format to MySQL 'datetime' format.
 *
 * @param {string} dateStr - The date string in 'yyyy-MM-dd' format.
 * @returns {string|null} - The formatted date string in 'yyyy-MM-dd hh:mm:ss' format for MySQL, or null if the input is invalid.
 */
export function formatToDatetime(date) {
    if (!date) return null;

    // Convert the string to a Date object
    const newDate = new Date(date);

    // Get current hours, minutes, and seconds
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Format date and time components
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Computes today's date in 'yyyy-MM-dd' format.
 * 
 * @returns {string} - The current date in 'yyyy-MM-dd' format.
 */
export const today = computed(() => {
    return new Date().toLocaleDateString('en-CA');
});