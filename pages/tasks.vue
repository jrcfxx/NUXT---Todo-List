<template>
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

            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="taskTitle"
                label="Title"
                placeholder="The title of the task"
                required
              ></v-text-field>

              <v-textarea
                v-model="taskDescription"
                label="Description"
                placeholder="Enter the description of the task"
                required
              ></v-textarea>

              <v-radio-group v-model="taskPriority" row>
                <label class="text-body-1 mb-2 font-weight-bold text-primary">Priority</label>
                <v-radio label="1" :value="1"></v-radio>
                <v-radio label="2" :value="2"></v-radio>
                <v-radio label="3" :value="3"></v-radio>
                <v-radio label="5" :value="5"></v-radio>
                <v-radio label="8" :value="8"></v-radio>
                <v-radio label="13" :value="13"></v-radio>
              </v-radio-group>

              <v-select
                v-model="taskStatus"
                :items="['Open', 'In Progress', 'Review', 'Hold', 'Closed']"
                label="Status"
                required
              ></v-select>

              <v-text-field
                v-model="taskDueDate"
                label="Due Date"
                type="date"
                required
              ></v-text-field>

              <v-text-field
                v-model="taskCompletenessDate"
                label="Completeness Date"
                type="date"
                :max="today"
              ></v-text-field>

              <v-btn color="primary" dark type="submit" block>Submit</v-btn>
              <v-btn color="primary" dark @click="clearFields" block style="margin-top: 16px;">Clear fields</v-btn>
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

<script setup>
import { useTaskStore } from '~/store/taskStore';
import { today } from '~/utils/dateUtils';

const taskStore = useTaskStore();
const router = useRouter();

const taskTitle = computed({
  get: () => taskStore.getTaskTitle,
  set: (value) => taskStore.setTaskTitle(value),
});

const taskDescription = computed({
  get: () => taskStore.getTaskDescription,
  set: (value) => taskStore.setTaskDescription(value),
});

const taskPriority = computed({
  get: () => taskStore.getTaskPriority,
  set: (value) => taskStore.setTaskPriority(value),
});

const taskStatus = computed({
  get: () => taskStore.getTaskStatus,
  set: (value) => taskStore.setTaskStatus(value),
});

const taskDueDate = computed({
  get: () => taskStore.getTaskDueDate,
  set: (value) => taskStore.setTaskDueDate(value),
});

const taskCompletenessDate = computed({
  get: () => taskStore.getTaskCompletenessDate,
  set: (value) => taskStore.setTaskCompletenessDate(value),
});

/**
 * Handles the form submission and creates a new task.
 * 
 * @returns {void}
 */
const handleSubmit = () => {
  taskStore.createTask()
};

// Function to clear the form fields
const clearFields = () => {
  taskTitle.value = '';
  taskDescription.value = '';
  taskPriority.value = '';
  taskStatus.value = '';
  taskDueDate.value = '';
  taskCompletenessDate.value = '';
};
</script>
