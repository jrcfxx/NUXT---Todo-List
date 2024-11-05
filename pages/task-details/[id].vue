<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container id="task-details" class="mt-12">
        <v-row>
          <v-col cols="12" md="8">
            <div>
              <h2 class="text-h4 mb-3 text-primary">Task Details</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Edit the details of the task below.</p>
            </div>

            <v-form @submit.prevent="handleSaveChanges">
              <v-text-field
                v-model="taskTitle"
                label="Title"
                placeholder="The title of the task"
              ></v-text-field>

              <v-textarea
                v-model="taskDescription"
                label="Description"
                placeholder="Enter the description of the task"
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
              ></v-select>

              <v-text-field
                v-model="taskDueDate"
                label="Due Date"
                type="date"
              ></v-text-field>

              <v-text-field
                v-model="taskCompletenessDate"
                label="Completeness Date"
                type="date"
                :max="today"
              ></v-text-field>

              <v-btn color="primary" dark type="submit" block>Save Changes</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTaskStore } from '~/store/taskStore';
import { today } from '~/utils/dateUtils';
import { formatDateToYYYYMMDD } from '~/utils/dateUtils';

const taskStore = useTaskStore();
const route = useRoute();
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
  get: () => formatDateToYYYYMMDD(taskStore.getTaskDueDate),
  set: (value) => taskStore.setTaskDueDate(value),
});

const taskCompletenessDate = computed({
  get: () => taskStore.getTaskCompletenessDate ? formatDateToYYYYMMDD(taskStore.getTaskCompletenessDate) : '',
  set: (value) => taskStore.setTaskCompletenessDate(value),
});

// Fetch task details when the component is mounted
onMounted( () => {
  const taskId = route.params.id;
  taskStore.fetchTask(taskId);
});

/**
 * Handle saving changes made in the task.
 * 
 * @returns {void}
 */
const handleSaveChanges = () => {
  const taskId = route.params.id;

  taskStore.saveChanges(taskId)
    .then(() => {
      router.push({ path: '/my-tasks' });
    })
};
</script>
