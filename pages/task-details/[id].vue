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

            <v-form @submit.prevent="handleSaveChanges">
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
            <p>{{ errors.fetch || 'Loading task details...' }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTaskStore } from '~/store/taskStore';
import { formatTimestamp } from '~/utils/dateUtils';

const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter();

/**
 * Computed property that retrieves the current task from the task store.
 * 
 * @returns {Object} - The current task object.
 */
const task = computed(() => taskStore.getTask);


/**
 * Computed property that retrieves error messages from the task store.
 * 
 * @returns {Object} - The object containing error messages for the form fields.
 */
const errors = computed(() => taskStore.getErrors);


/**
 * Runs when the component is mounted.
 * It fetches the task details based on the ID from the route parameters.
 */
onMounted(() => {
  const taskId = route.params.id;

  // Fetch the task and handle the response
  taskStore.fetchTask(taskId).then((fetchedTask) => {
    if (fetchedTask) {
      // Format due_date and completeness_date before setting the task
      taskStore.setTask({
        ...fetchedTask,
        due_date: formatTimestamp(fetchedTask.due_date),
        completeness_date: fetchedTask.completeness_date ? formatTimestamp(fetchedTask.completeness_date) : null,
      });
    }
  }).catch(() => {
    taskStore.setErrors({ fetch: 'Could not fetch task details.' });
  });
});


/**
 * Saves the changes made to the task and navigates back to the my-tasks route.
 * 
 * @returns {void}
 */
const handleSaveChanges = () => {
  taskStore.saveTask(task.value).then(() => {
    router.push({ path: '/my-tasks' });
  }).catch((validationErrors) => {
    taskStore.setErrors(validationErrors.errors || {});
  });
};
</script>