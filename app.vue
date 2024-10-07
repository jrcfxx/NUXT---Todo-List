<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '~/store/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

// call the initializeStore method from the authStore as soon as the component is mounted. 
// initializeStore() function -> restores the authentication token and permissions from localStorage and updates the store's state accordingly
onMounted(() => {
  authStore.initializeStore(); 
});
</script>