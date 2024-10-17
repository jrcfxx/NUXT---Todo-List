<template>
  <v-app-bar app color="primary" dark>
    <v-icon class="pl-10">mdi-check</v-icon>
    <v-toolbar-title>Todo List</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-if="isAuthenticated" @click="redirect('/tasks')">Home</v-btn>
    <v-btn text v-if="isAuthenticated" @click="redirect('/my-tasks')">My Tasks</v-btn>
    <v-btn text v-if="isAuthenticated && $route.path!=='/'" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/store/authStore';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isAuthenticated = computed(() => {
  return authStore.getRoles.length > 0 || authStore.getPermissions.length > 0;
});
const isLoadingUserInfo = ref(true);

const logout = async () => {
  await authStore.logout();
  router.push('/');
};

const redirect = (path) => {
  router.push({ path });
};

onMounted(async () => {
  const token = authStore.loadFromLocalStorage();

  if (token) {
    const userInfo = await authStore.getUserInfo();

    if (userInfo.error) {
      authStore.cleanStore();
      router.push('/');
    }
  }

  isLoadingUserInfo.value = false;
});
</script>
