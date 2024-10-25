import { formatTimestamp, validateCompletenessDate } from '~/utils/dateUtils';

export const useTaskStore = defineStore('useTaskStore', {
    state: () => ({
        tasks: [], // Array to hold multiple tasks
        task: null, // Object to hold a single task
        errors: {}, // Object to hold error messages
      }),
  
      getters: {
        /**
         * Returns the list of tasks.
         * @returns {Array} - The array of tasks.
         */
        getTasks: (state) => state.tasks,

        /**
         * Returns the current task.
         * @returns {Object|null} - The current task object, or null if no task is set.
         */
        getTask: (state) => state.task,

        /**
         * Returns the validation error messages.
         * @returns {Object} - The object containing validation error messages.
         */
        getErrors: (state) => state.errors,

        /**
         * Checks if there are any validation errors.
         * @returns {boolean} - True if there are errors, false otherwise.
         */
        hasErrors: (state) => !!Object.keys(state.errors).length,
    },
    
    actions: {
        /**
         * Sets the current task in the state.
         * @param {Object} task - The task object to set as the current task.
         * @returns {void}
         */
        setTask(task) {
            this.task = task;
        },

        /**
         * Sets the list of tasks in the state.
         * @param {Array} tasks - The array of tasks to set in the state.
         * @returns {void}
         */
        setTasks(tasks) {
            this.tasks = tasks;
        },

        /**
         * Sets error messages in the state.
         * @param {Object} errors - The error messages to set in the state.
         * @returns {void}
         */
        setErrors(errors) {
            this.errors = errors;
        },
  
        /**
         * Creates a new task by sending data to the API.
         * 
         * @param {Object} taskData - The task data to send to the API.
         * @returns {void}
         */
        createTask(taskData) {
            const { $api } = useNuxtApp();
    
            return $api.post('/tasks', taskData)
            .then((response) => {
            this.tasks.push(response.data); // Update the tasks state with the new task
            }).catch(() => { 
            alert('Task creation failed'); 
            });
        },
  
        /**
         * Submits task data for validation and creation.
         * 
         * @param {string} title - The title of the task.
         * @param {string} description - The description of the task.
         * @param {number} priority - The priority of the task.
         * @param {string} status - The current status of the task.
         * @param {string} due_date - The due date for the task.
         * @param {string} completeness_date - The completion date for the task (optional).
         * 
         * @returns {void}
         */
        submitTask(title, description, priority, status, due_date, completeness_date) {
            return new Promise((resolve, reject) => {
                const validationError = validateCompletenessDate(completeness_date);

                if (validationError) { 
                    reject({ error: validationError }); 
                } else {
                    const taskData = {
                        title,
                        description,
                        priority,
                        status,
                        due_date,
                        completeness_date: completeness_date || null,
                    };

                    this.createTask(taskData)
                    .then(() => resolve()) // Resolve if task creation is successful
                    .catch(() => reject({ errors: { submit: 'Task creation failed' } })); // Reject if task creation fails
                }
            });
        },
  
        /**
         * Fetches all tasks from the API.
         * 
         * @returns {void}
         */
        fetchTasks() {
            const { $api } = useNuxtApp();
    
            return $api.get('/tasks').then((response) => {
            this.setTasks(response.data);
            }).catch(() => {
            alert('Failed to fetch tasks.');
            });
        },

        /**
         * Fetches a single task by its ID.
         * 
         * @param {number} id - The ID of the task to fetch.
         * 
         * @returns {Object|null>} - Returns the fetched task object or null if not found.
         */
        fetchTask(id) {
            const { $api } = useNuxtApp();
        
            // Fetch a task by ID
            return $api.get(`/tasks/${id}`).then((response) => {
                this.setTask(response.data);
                return response.data;
            }).catch(() => { 
                alert('Failed to fetch task');
            });
        },
  
        /**
         * Deletes a specific task by its ID.
         * 
         * @param {number} taskId - The ID of the task to be deleted.
         * 
         * @returns {void}
         */
        deleteTask(taskId) {
            const { $api } = useNuxtApp();
            if (confirm('Are you sure you want to delete this task?')) {
                $api.delete(`/tasks/${taskId}`).then(() => {
                    this.setTasks(this.tasks.filter(task => task.id !== taskId)); // Update tasks state by removing the deleted task
                    alert('Task deleted successfully');
                }).catch(() => {
                    alert('Failed to delete task');
                });
            }
        },
  
        /**
         * Navigates to the edit page for a specific task.
         * 
         * @param {number} taskId - The ID of the task to be edited.
         * 
         * @returns {void}
         */
        editTask(taskId) {
          const router = useRouter(); 

          router.push({ path: `/task-details/${taskId}` }); 
        },
  
        /**
         * Saves changes to an existing task.
         * 
         * @param {Object} task - The task object with updated data.
         * 
         * @returns {void}
         */
        async saveTask(task) {
          const { $api } = useNuxtApp();
    
          const updatedTask = {
            ...task,
            due_date: task.due_date ? formatTimestamp(new Date(task.due_date)) : null, // Assign null if due_date is not provided
            completeness_date: task.completeness_date ? formatTimestamp(new Date(task.completeness_date)) : null, // Assign null if completeness_date is not provided
          };
    
          $api.put(`/tasks/${task.id}`, updatedTask).then(() => {
          }).catch(() => { 
            alert('Failed to update task');
          });
        },
      }
  });
