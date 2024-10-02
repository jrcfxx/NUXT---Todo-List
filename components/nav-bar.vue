<template>
  <v-app-bar app color="primary" dark>
    <v-icon class="pl-10">mdi-check</v-icon>
    <v-toolbar-title>Todo List</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-if="isLoginSuccessful" @click="redirect('/tasks')">Home</v-btn>
    <v-btn text v-if="isLoginSuccessful" @click="redirect('/my-tasks')">My Tasks</v-btn>
    <v-btn text v-if="isLoginSuccessful && $route.path!=='/'" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const logout = async () => {
  await authStore.logout();
  router.push('/'); 
};

const isLoginSuccessful = computed(() => authStore.getIsLoginSuccessful);

const redirect = (path) => {
  router.push({ path });
};
</script>
