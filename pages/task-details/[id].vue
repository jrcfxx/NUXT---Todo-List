<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container id="task-details" class="mt-12">
        <v-row v-if="task && task.id">
          <v-col cols="12" md="8">
            <div>
              <h2 class="text-h4 mb-3 text-primary">Task Details</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Edit the details of the task below.</p>
            </div>

            <v-form @submit.prevent="saveChanges">
              <v-text-field
                v-model="task.title"
                label="Title"
                placeholder="The title of the task"
                :error-messages="errors.title"
              ></v-text-field>

              <v-textarea
                v-model="task.description"
                label="Description"
                placeholder="Enter the description of the task"
                :error-messages="errors.description"
              ></v-textarea>

              <v-radio-group v-model="task.priority" row>
                <label class="text-body-1 mb-2 font-weight-bold text-primary">Priority</label>
                <v-radio label="1" :value="1"></v-radio>
                <v-radio label="2" :value="2"></v-radio>
                <v-radio label="3" :value="3"></v-radio>
                <v-radio label="5" :value="5"></v-radio>
                <v-radio label="8" :value="8"></v-radio>
                <v-radio label="13" :value="13"></v-radio>
              </v-radio-group>

              <v-select
                v-model="task.status"
                :items="['Open', 'In Progress', 'Review', 'Hold', 'Closed']"
                label="Status"
                :error-messages="errors.status"
              ></v-select>

              <v-text-field
                v-model="task.due_date"
                label="Due Date"
                type="date"
                :error-messages="errors.due_date"
              ></v-text-field>

              <v-text-field
                v-model="task.completeness_date"
                label="Completeness Date"
                type="date"
                :error-messages="errors.completeness_date"
              ></v-text-field>

              <v-btn color="primary" dark type="submit" block>Save Changes</v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <p>Loading task details...</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from '~/store/authStore';

export default {
  data() {
    return {
      task: null, // is initially set to null until it's fetched from the API
      errors: {} // store validation errors received from the server
    };
  },
  mounted() {
    const taskId = this.$route.params.id;
    this.fetchTask(taskId);
  },
  methods: {
    async fetchTask(id) {
      const store = useAuthStore();
      const {$api} = useNuxtApp();

      // Fetch task details from the server using the task ID
      try {
        const response = await this.$api.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${store.getToken}`,
          },
        });
        this.task = response.data || {
          // If data is returned, assign it to 'task', or create a default empty object if the response is empty
          id: null,
          title: '',
          description: '',
          priority: 1,
          status: '',
          due_date: '',
          completeness_date: ''
        };
        // Format dates for display in the input fields
        this.task.due_date = this.formatDateToInput(this.task.due_date);
        this.task.completeness_date = this.formatDateToInput(this.task.completeness_date);
      } catch (error) {
        console.error('Failed to fetch task:', error.response ? error.response.data : error);
        alert('Error fetching task');
      }
    },
    // Formats the date to 'YYYY-MM-DD'
    formatDateToInput(dateString) {
      return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    },
    async saveChanges() {
      try {
        const updatedTask = {
          ...this.task,
          // send date in 'YYYY-MM-DD' format
          due_date: this.task.due_date ? this.task.due_date : null,
          completeness_date: this.task.completeness_date ? this.task.completeness_date : null,
        };

        await this.$api.put(`/tasks/${this.task.id}`, updatedTask, {
          headers: {
            Authorization: `Bearer ${store.getToken}`,
          }
        });
        alert('Task updated successfully');
        this.$router.push({ path: '/my-tasks' });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.messages) {
          const errorMessages = error.response.data.messages;
          this.handleErrors(errorMessages);
        } else {
          alert('Failed to update task: Unknown error');
        }
      }
    },
    // Capture and store validation errors from the server
    handleErrors(errors) {
      this.errors = errors || {};
    }
  }
};
</script>
