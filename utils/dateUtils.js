import { useTaskStore } from '~/store/taskStore';

/**
 * Validates the completeness date to ensure it is not set in the future.
 *
 * @param {string} completeness_date - The completion date to validate.
 * @returns {string|null} - Returns an error message if the date is in the future, otherwise null.
 */
export function validateCompletenessDate(completeness_date) {
    // Get today's date
    const today = new Date(); 
    let error = null;

    // Check if the completeness date is provided and if it is in the future
    if (completeness_date && new Date(completeness_date) > today.setHours(0, 0, 0, 0)) {
        error = 'The completeness date cannot be in the future.';
    }

    const taskStore = useTaskStore();

    // Set the errors in the task store state
    taskStore.setError(error);

    return error;
}

/**
 * Formats a date string for display.
 * 
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string, or '-' if no date is provided.
 */
export const formatDate = (dateString) => {
    if (!dateString) return '-'; 
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
    return new Date(dateString).toLocaleDateString(undefined, options); 
};

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}