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
import { ref } from 'vue';
import { useTaskStore } from '~/store/taskStore';

const title = ref('');
const description = ref('');
const priority = ref(1);
const status = ref('Open');
const due_date = ref('');
const completeness_date = ref('');
const errors = ref({});

const taskStore = useTaskStore(); 
const router = useRouter();

const handleSubmit = () => {
  taskStore.submitTask(
    title.value,
    description.value,
    priority.value,
    status.value,
    due_date.value,
    completeness_date.value
  ).then(() => {router.push({ path: '/my-tasks' });
  }).catch((validationErrors) => {
    errors.value = validationErrors;
  });
};
</script>

