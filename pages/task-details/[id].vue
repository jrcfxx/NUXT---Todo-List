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

<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '~/store/taskStore';

const taskStore = useTaskStore();
const task = ref(null);
const errors = ref({});
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const taskId = route.params.id;
  taskStore.fetchTask(taskId).then((fetchedTask) => {
    if (fetchedTask) {
      fetchedTask.due_date = taskStore.formatDateToInput(fetchedTask.due_date);
      fetchedTask.completeness_date = taskStore.formatDateToInput(fetchedTask.completeness_date);
      task.value = fetchedTask;
    }
  });
});

const saveChanges = () => {
  taskStore.saveTask(task.value).then((success) => {
    if (success) {
      router.push({ path: '/my-tasks' });
    }
  });
};
</script>
