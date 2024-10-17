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

</script>