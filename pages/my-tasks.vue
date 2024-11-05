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
                <tr v-for="task in taskStore.tasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>{{ task.priority }}</td>
                  <td>{{ task.status }}</td>
                  <td>{{ formatDateToYYYYMMDD(task.due_date) }}</td>
                  <td>{{ formatDateToYYYYMMDD(task.completeness_date) }}</td>
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
import { useTaskStore } from '~/store/taskStore';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

// Load tasks when the component is mounted
onMounted(() => {
  taskStore.fetchTasks();
});

/**
 * Handle task deletion.
 * 
 * @param {number} taskId - The ID of the task to delete.
 * 
 * @returns {void}
 */
const handleDeleteTask = async (taskId) => {
  await taskStore.deleteTask(taskId);
  taskStore.fetchTasks();
};

/**
 * Handle task editing by redirecting to the edit page.
 * 
 * @param {number} taskId - The ID of the task to edit.
 * 
 * @returns {void}
 */
const handleEditTask = (taskId) => {
  router.push({ path: `/task-details/${taskId}` });
};
</script>