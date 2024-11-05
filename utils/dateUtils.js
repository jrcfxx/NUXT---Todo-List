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
 * Converts a timestamp to a formatted date string.
 * 
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} - The formatted date string in 'yyyy-MM-dd' format.
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; 
}

/**
 * Computes today's date in 'yyyy-MM-dd' format.
 * 
 * @returns {string} - The current date in 'yyyy-MM-dd' format.
 */
export const today = computed(() => {
    return new Date().toLocaleDateString('en-CA');
});