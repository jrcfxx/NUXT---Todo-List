<template>
  <!-- Involves the entire application -->
  <v-app>
    <!-- navigation bar -->
    <v-app-bar app :style="{ backgroundColor: '#8B0000' }" dark>
      <v-toolbar-title>Todo List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goToHome">Home</v-btn>
      <v-btn text @click="goToMyTasks">My Tasks</v-btn>
    </v-app-bar>

    <v-main>
      <v-container id="home" class="mt-12">
        <v-row>
          <v-col cols="12" md="8">
            <div class="form-header">
              <h2>What's new for today?</h2>
              <p>Fill out the fields to create the tasks.</p>
            </div>

            <v-form @submit.prevent>
              <!-- Text field for task title -->
              <v-text-field
                label="Title"
                placeholder="The title of the task"
                required
              ></v-text-field>

              <v-textarea
                label="Description"
                placeholder="Enter the description of the task"
                required
              ></v-textarea>

              <v-radio-group row>
                <label class="priority-label">Priority</label>
                <v-radio label="1" :value="1"></v-radio>
                <v-radio label="2" :value="2"></v-radio>
                <v-radio label="3" :value="3"></v-radio>
                <v-radio label="5" :value="5"></v-radio>
                <v-radio label="8" :value="8"></v-radio>
                <v-radio label="13" :value="13"></v-radio>
              </v-radio-group>

              <v-select
                :items="['Open', 'In Progress', 'Review', 'Hold', 'Closed']"
                label="Status"
                required
              ></v-select>

              <v-text-field
                label="Due Date"
                type="date"
                required
              ></v-text-field>

              <v-text-field
                label="Completeness Date"
                type="date"
              ></v-text-field>

              <v-btn :style="{ backgroundColor: '#8B0000' }" dark type="submit" block>Submit</v-btn>
            </v-form>
          </v-col>

          <v-col cols="12" md="4">
            <!-- Illustration image -->
            <img src="C:\Users\fiorinij\Documents\projects\NUXT---Todo-List\assets\Icon_img.png" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ path: '/' });
    },
    goToMyTasks() {
      this.$router.push({ path: '/tasks' });
    },
  },
};
</script>

<style scoped>
.form-header {
  margin-bottom: 20px;
}

.form-header h2 {
  font-size: 2rem;
  color: #8B0000; 
  margin-bottom: 10px;
}

.form-header p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 20px;
}

.priority-label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #8B0000;
}

.illustration {
  max-width: 100%;
}

.v-btn {
  margin-top: 20px;
  color: white;
}
</style>
