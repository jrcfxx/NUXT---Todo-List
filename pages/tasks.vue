<template>
  <!-- Involves the entire application -->
  <v-app>
    <NavBar />

    <v-main>
      <v-container id="home" class="mt-12">
        <v-row>
          <v-col cols="12" md="8">
            <div>
              <h2 class="text-h4 mb-3 text-primary">What's new for today?</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Fill out the fields to create the tasks.</p>
            </div>

            <v-form @submit.prevent="createTask">
              <v-text-field
                v-model="title"
                label="Title"
                placeholder="The title of the task"
                :error-messages="errors.title"
                required
              ></v-text-field>

              <v-textarea
                v-model="description"
                label="Description"
                placeholder="Enter the description of the task"
                :error-messages="errors.description"
                required
              ></v-textarea>

              <v-radio-group v-model="priority" row>
                <label class="text-body-1 mb-2 font-weight-bold text-primary">Priority</label>
                <v-radio label="1" :value="1"></v-radio>
                <v-radio label="2" :value="2"></v-radio>
                <v-radio label="3" :value="3"></v-radio>
                <v-radio label="5" :value="5"></v-radio>
                <v-radio label="8" :value="8"></v-radio>
                <v-radio label="13" :value="13"></v-radio>
              </v-radio-group>

              <v-select
                v-model="status"
                :items="['Open', 'In Progress', 'Review', 'Hold', 'Closed']"
                label="Status"
                :error-messages="errors.status"
                required
              ></v-select>

              <v-text-field
                v-model="due_date"
                label="Due Date"
                type="date"
                :error-messages="errors.due_date"
                required
              ></v-text-field>

              <v-text-field
                v-model="completeness_date"
                label="Completeness Date"
                type="date"
                :error-messages="errors.completeness_date"
              ></v-text-field>

              <v-btn color="primary" dark type="submit" block>Submit</v-btn>
            </v-form>
          </v-col>

          <v-col cols="12" md="4">
            <v-img src="@/assets/Icon_img.png" max-width="100%"></v-img>
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
      title: '',
      description: '',
      priority: 1,
      status: 'Open',
      due_date: '',
      completeness_date: '',
      errors: {} // Store error messages
    };
  },
  methods: {
    validateDates() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
      if (this.completeness_date && this.completeness_date > today) {
        this.errors.completeness_date = ['The completeness date cannot be in the future.'];
        return false; // Validation failed
      }
      this.errors = {}; // Clear errors if everything is valid
      return true; // Validation successful
    },
    async createTask() {
      if (!this.validateDates()) {
        // Stop submission if validation fails
        return;
      }

      try {
        const taskData = {
          title: this.title,
          description: this.description,
          priority: this.priority,
          status: this.status,
          due_date: this.due_date,
        };

        if (this.completeness_date) {
          taskData.completeness_date = this.completeness_date;
        }

        const response = await this.$api.post('/tasks', taskData);

        this.$router.push({ path: `/my-tasks` });
      } catch (error) {
        // Handle server-side errors
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Task creation failed:', error);
          alert('Task creation failed: ' + (error.response ? error.response.data.message : 'Unknown error'));
        }
      }
    },
  },
};
</script>
