import { defineStore } from 'pinia'; 
import { useNuxtApp } from '#app'; 

export const useTaskStore = defineStore('useTaskStore', {
  actions: {

    // Function to validate due and completeness dates
    validateDates(due_date, completeness_date) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const errors = {}; // Initialize an object to hold validation errors

      // Check if the due date is in the past
      if (due_date && due_date < today) {
        errors.due_date = ['The due date cannot be in the past.'];
      }

      // Check if the completeness date is in the future
      if (completeness_date && completeness_date > today) {
        errors.completeness_date = ['The completeness date cannot be in the future.']; 
      }

      return errors; // errors object
    },

    createTask(taskData) {
      const { $api } = useNuxtApp();

      return $api.post('/tasks', taskData)
        .then(() => true) 
        .catch(() => { 
          alert('Task creation failed'); 
          return false; 
        });
    },

    async submitTask(title, description, priority, status, due_date, completeness_date) {
      const validationErrors = this.validateDates(due_date, completeness_date);
      
      // If there are validation errors, return them
      if (Object.keys(validationErrors).length) {
        return { success: false, errors: validationErrors }; // Return success as false and include errors
      }

      const taskData = {
        title,
        description,
        priority,
        status,
        due_date,
        completeness_date: completeness_date || null, // if completeness_date is not provided
      };

      const success = await this.createTask(taskData);
      return { success };
    },

    // fetch all tasks
    fetchTasks() {
      const { $api } = useNuxtApp();
      
      return $api.get('/tasks').then((response) => response.data)
        .catch(() => {
          alert('Failed to fetch tasks.');
          return []; 
        });
    },

    deleteTask(taskId) {
      const { $api } = useNuxtApp();

      if (confirm('Are you sure you want to delete this task?')) {
        return $api.delete(`/tasks/${taskId}`).then(() => { 
            alert('Task deleted successfully'); 
            return true;
          }).catch(() => {
            alert('Failed to delete task'); 
            return false; 
          });
      }
      return Promise.resolve(false); // Return a resolved promise for consistency
    },

    editTask(taskId) {
      const router = useRouter();
      router.push({ path: `/task-details/${taskId}` }); 
    },

    // fetch a single task by its ID
    fetchTask(id) {
      const { $api } = useNuxtApp();

      return $api.get(`/tasks/${id}`)
        .then((response) => response.data || { 
          id: null,
          title: '',
          description: '',
          priority: 1,
          status: '',
          due_date: '',
          completeness_date: ''
        }).catch(() => { 
          alert('Failed to fetch task'); 
          return null;
        });
    },

    async saveTask(task) {
      const { $api } = useNuxtApp();

      const updatedTask = {
        ...task,
        due_date: task.due_date || null, // if due_date is not provided
        completeness_date: task.completeness_date || null, // if completeness_date is not provided
      };

      return $api.put(`/tasks/${task.id}`, updatedTask).then(() => {
          alert('Task updated successfully'); 
          return true; 
        }).catch(() => { 
          alert('Failed to update task'); 
          return false;
        });
    },

    formatDateToInput(dateString) {
      return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    },
  }
});
