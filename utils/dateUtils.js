import { useTaskStore } from '~/store/taskStore';

// Function to validate due and completeness dates
export function validateCompletenessDate(completeness_date) {
    // Get today's date
    const today = new Date(); 
    const errors = {}; // Object to store validation error messages

    // Check if the completeness date is provided and if it is in the future
    if (completeness_date && new Date(completeness_date) > today.setHours(0, 0, 0, 0)) {
        //  add an error message to the errors object
        errors.completeness_date = ['The completeness date cannot be in the future.'];
    }

    const taskStore = useTaskStore();

    // Set the errors in the task store state
    taskStore.setErrors(errors);

    return errors;
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

export function convertToTimestamp(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}