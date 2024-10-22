<template>
<v-app>
     <NavBar />

    <v-main>
  <v-container id="login" class="mt-12">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div>
          <h2 class="text-h4 mb-3 text-primary">Login</h2>
          <p class="text-subtitle-1 mb-4 text-secondary">
            Please enter your credentials to continue.
          </p>
        </div>

        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            color="primary"
            dark
            type="submit"
            block
          >
            <span v-if="!isLoading">Login</span>

            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
              class="mx-auto"
            ></v-progress-circular>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</v-app>
</template>


<script setup>
  import {useAuthStore} from '~/store/authStore' 
  import { ref } from 'vue'

  let email=ref('')
  let password=ref('')
  let isLoading=ref(false)
  const authStore = useAuthStore()
  const {$api} = useNuxtApp()
  const router = useRouter()
  
const handleLogin = async () => {
    isLoading.value = true;

    authStore.login(email.value, password.value).then(() => {
        router.push('/tasks');
    }).catch(() => {alert('Login failed. Please check your credentials.');
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>


