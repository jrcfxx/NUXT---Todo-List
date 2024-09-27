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

        <v-form @submit.prevent="login">
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

  let email=ref('')
  let password=ref('')
  let isLoading=ref(false)
  const store = useAuthStore()
  const {$api} = useNuxtApp()

  console.log($api)

  
  const login = async () => {
    try {
      isLoading.value = true;

      // Send the credentials to the login endpoint
      // await: pauses the execution of the login function until the Promise returned is resolved (or rejected)
      // $api: Axios instance

      const response = await $api.post('/login', {
        email: email.value,
        password: password.value,
      }).then((response)=>{

        const result = response.data
        store.setToken(result.token)
        store.setRoles(result.roles)
        store.setPermissions(result.permissions)



        }).catch((error)=>{
          // ********************************* 
          alert("Credenciais inválidas.")
        })


      await navigateTo('/tasks');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      isLoading.value = false; 
    }
  }
</script>


