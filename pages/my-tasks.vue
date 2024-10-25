<template> 
 <!-- Involves the entire application -->
  <v-app>
    <NavBar />

    <v-main>
      <v-container id="tasks" class="mt-12">
        <v-row>
          <v-col cols="12">
            <div>
              <h2 class="text-h4 mb-3 text-primary">My tasks</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Your tasks created</p>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th class="text-left" width="8%">Task</th>
                  <th class="text-left" width="12%">Title</th>
                  <th class="text-left" width="25%">Description</th>
                  <th class="text-left" width="10%">Priority</th>
                  <th class="text-left" width="15%">Status</th>
                  <th class="text-left" width="15%">Due Date</th>
                  <th class="text-left" width="15%">Completeness Date</th>
                  <th class="text-left" width="10%">Action</th>
                </tr>
              </thead>
              <tbody>              
                <!-- For each item in tasks, a new <tr> element will be generated -->
                <tr v-for="task in tasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.priority }}</td>
                  <td>{{ task.status }}</td>
                  <td>{{ formatDate(task.due_date) }}</td>
                  <td>{{ formatDate(task.completeness_date) }}</td>
                  <td class="d-flex">
                    <v-btn class="mx-1" icon @click="handleEditTask(task.id)">
                      <v-icon color="green">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" icon @click="handleDeleteTask(task.id)">
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useTaskStore } from '~/store/taskStore';

const taskStore = useTaskStore();

/**
 * Computed property to get tasks from the store.
 * 
 * @returns {Array} - The list of tasks from the task store.
 */
const tasks = computed(() => taskStore.tasks);


/**
 * Function to format dates for display.
 * 
 * @param {string} dateString - The date string to format.
 * 
 * @returns {string} - The formatted date string, or '-' if no date is provided.
 */
const formatDate = (dateString) => {
  if (!dateString) return '-'; 
  const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
  return new Date(dateString).toLocaleDateString(undefined, options); 
};

/**
 * Load tasks from the store.
 * 
 * @returns {void}
 */
const loadTasks = () => {
  taskStore.fetchTasks(); // Fetch tasks and store them in the state
};

/**
 * Handle task deletion.
 * 
 * @param {number} taskId - The ID of the task to delete.
 * 
 * @returns {void}
 */
const handleDeleteTask = async (taskId) => {
  await taskStore.deleteTask(taskId); // Delete the task using the store action
  loadTasks(); // Reload tasks after deletion
};


/**
 * Handle task editing.
 * 
 * @param {number} taskId - The ID of the task to edit.
 * 
 * @returns {void}
 */
const handleEditTask = (taskId) => {
  taskStore.editTask(taskId);
};

// Load tasks when the component is mounted
onMounted(loadTasks);
</script>