<template>
  <!-- Involves the entire application -->
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon class="mr-2">mdi-check</v-icon>
      <v-toolbar-title>Todo List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goToHome">Home</v-btn>
      <v-btn text @click="goToMyTasks">My Tasks</v-btn>
    </v-app-bar>

    <v-main>
      <v-container id="tasks" class="mt-12">
        <v-row>
          <v-col cols="12">
            <div>
              <h2 class="text-h4 mb-3 text-primary">My tasks</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Your tasks created</p>
            </div>

            <v-simple-table>
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
                  <td>
                    <v-btn icon>
                      <v-icon color="green">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 'TSK-123', title: 'Task 1', description: 'Description of Task 1', priority: 13, status: 'Open', due_date: '2024-12-05T12:00:00', completeness_date: '2024-12-05T12:00:00' },
        { id: 'TSK-124', title: 'Task 2', description: 'Description of Task 2', priority: 8, status: 'In Progress', due_date: '2024-12-06T12:00:00', completeness_date: '2024-12-06T12:00:00' },
      ],
    };
  },
  methods: {
    goToHome() {
      this.$router.push({ path: '/tasks' });
    },
    goToMyTasks() {
      this.$router.push({ path: '/mytasks' });
    },
    formatDate(dateString) {
      // format the date for display
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.v-simple-table th, .v-simple-table td {
  padding: 12px;
  text-align: left;
}

.v-simple-table th {
  font-weight: bold;
}
</style>
