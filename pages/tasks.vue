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

<script setup>
import { useAuthStore } from '~/store/authStore';
import { ref } from 'vue';

const title = ref('');
const description = ref('');
const priority = ref(1);
const status = ref('Open');
const due_date = ref('');
const completeness_date = ref('');
const errors = ref({});

const store = useAuthStore();
const {$api} = useNuxtApp();
const router = useRouter();
const validateDates = () => {
  const today = new Date().toISOString().split('T')[0]; 

  if (due_date.value && due_date.value < today) {
    errors.value.due_date = ['The due date cannot be in the past.'];
    return false;
  }

  if (completeness_date.value && completeness_date.value > today) {
    errors.value.completeness_date = ['The completeness date cannot be in the future.'];
    return false;
  }

  errors.value = {}; 
  return true;
};

const createTask = () => {
  if (!validateDates()) {
    return; // Stop if validation fails
  }

  const taskData = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: status.value,
    due_date: due_date.value,
  };

  if (completeness_date.value) {
    taskData.completeness_date = completeness_date.value;
  }

  $api.post('/tasks', taskData).then(() => {
    router.push({ path: '/my-tasks' });
    }).catch(() => {alert('Task creation failed');});
};

</script>