
export const useTaskStore = defineStore('useTaskStore', {
    state: () => ({
        tasks: [], // Array to hold multiple tasks

        task: { // Single task object
            title: '',
            description: '',
            priority: 0,
            status: '',
            due_date: null,
            completeness_date: null,
        },

        errors: {},
      }),
  
    getters: {

        // Getters for task attributes
        getTaskTitle: (state) => state.task.title,
        getTaskDescription: (state) => state.task.description,
        getTaskPriority: (state) => state.task.priority,
        getTaskStatus: (state) => state.task.status,
        getTaskDueDate: (state) => state.task.due_date,
        getTaskCompletenessDate: (state) => state.task.completeness_date,

        /**
         * Returns the list of tasks.
         * @returns {Array} - The array of tasks.
         */
        getTasks: (state) => state.tasks,
    },
    
    actions: {
        // Setters for task attributes
        setTaskTitle(title) {
          this.task.title = title;
        },
        setTaskDescription(description) {
          this.task.description = description;
        },
        setTaskPriority(priority) {
          this.task.priority = priority;
        },
        setTaskStatus(status) {
          this.task.status = status;
        },
        setTaskDueDate(due_date) {
          this.task.due_date = due_date;
        },
        setTaskCompletenessDate(completeness_date) {
            this.task.completeness_date = completeness_date || null;
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
         * Validates required fields before creating a task.
         * 
         * @returns {boolean} - Returns true if validation passes; otherwise, false.
         */
        validateFields() {
            this.errors = {}; // Reset errors

            if (!this.task.title) {
                this.errors.title = 'The field "Title" must be filled.';
                alert('The field "Title" must be filled.');
            }
            if (!this.task.description) {
                this.errors.description = 'The field "Description" must be filled.';
                alert('The field "Description" must be filled.');
            }

            // Return true if no errors, otherwise false
            return Object.keys(this.errors).length === 0; 
        },
  
        /**
         * Creates a new task by sending data to the API.
         * 
         * @returns {void}
         */
        createTask() {
            const { $api } = useNuxtApp();

            // Validate fields before proceeding
            const isValid = this.validateFields();
            if (!isValid) {
                return;
            }

            const taskData = {
                title: this.task.title,
                description: this.task.description,
                priority: this.task.priority,
                status: this.task.status,
                due_date: this.task.due_date,
                completeness_date: this.task.completeness_date,
            };

            return $api.post('/tasks', taskData)
            .then((response) => {
                alert('Task created successfully.'); 
            })
            .catch(() => { 
                alert('Task creation failed'); 
            });
        },
  
        /**
         * Fetches all tasks from the API.
         * 
         * @returns {void}
         */
        fetchTasks() {
            const { $api } = useNuxtApp();
    
            return $api.get('/tasks')
            .then((response) => {
                this.setTasks(response.data);
            }).catch(() => {
                alert('Failed to fetch tasks.');
            });
        },

        /**
         * Fetches a single task by its ID.
         * 
         * @param {number} taskId - The ID of the task to fetch.
         * 
         * @returns {Object|null>} - Returns the fetched task object or null if not found.
         */
        fetchTask(taskId) {
            const { $api } = useNuxtApp();
        
            // Fetch a task by ID
            return $api.get(`/tasks/${taskId}`)
                .then((response) => {
                    const fetchedTask = response.data;
        
                    this.task = {
                        id: fetchedTask.id,
                        title: fetchedTask.title,
                        description: fetchedTask.description,
                        priority: fetchedTask.priority,
                        status: fetchedTask.status,
                        due_date: fetchedTask.due_date,
                        completeness_date: fetchedTask.completeness_date || null,
                    };
                })
                .catch(() => {
                    alert('Failed to fetch task.'); 
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
                    alert('Task deleted successfully');
                }).catch(() => {
                    alert('Failed to delete task');
                });
            }
        },
  
        /**
         * Saves changes to an existing task.
         * 
         * @param {number} taskId - The ID of the task to update.
         * @returns {void}
         */
        saveChanges(taskId) {
            const { $api } = useNuxtApp();
          
            const updatedTask = {
                title: this.task.title,
                description: this.task.description,
                priority: this.task.priority,
                status: this.task.status,
                due_date: this.task.due_date,
                completeness_date: this.task.completeness_date,
            };

            return $api.put(`/tasks/${taskId}`, updatedTask)
            .then(() => {
                alert('Task updated successfully');
            })
            .catch(() => {
                alert('Failed to update task.');
            });
        },
      }
  });
