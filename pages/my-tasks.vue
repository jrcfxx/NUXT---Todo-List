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
                    <v-btn class="mx-1" icon @click="editTask(task)">
                      <v-icon color="green">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mx-1" icon @click="deleteTask(task.id)">
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
import { useAuthStore } from '~/store/authStore';
import { ref, onMounted } from 'vue';

const tasks = ref([]);
const store = useAuthStore();
const { $api } = useNuxtApp();
const router = useRouter();

const formatDate = (dateString) => {
  if (!dateString) {
    return '-'; // In case the date is null
  }
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Search for the tasks of the logged user
const fetchTasks = () => {
  $api.get('/tasks').then((response) => {
    tasks.value = response.data;
  }).catch(() => {alert('Failed to fetch tasks.');});
};

const deleteTask = (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    $api.delete(`/tasks/${taskId}`).then(() => {
      tasks.value = tasks.value.filter(task => task.id !== taskId);
      alert('Task deleted successfully');
    }).catch(() => {alert('Failed to delete task');});
  }
};

const editTask = (task) => {
  // Redirects the user to the tasks details
  router.push({ path: `/task-details/${task.id}` });
};

onMounted(() => {
  fetchTasks();
});
</script>
