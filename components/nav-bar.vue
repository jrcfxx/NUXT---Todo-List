<template>
  <v-app-bar app color="primary" dark>
    <v-icon class="pl-10">mdi-check</v-icon>
    <v-toolbar-title>Todo List</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-if="authStore.getIsLoginSuccessful" @click="redirect('/tasks')">Home</v-btn>
    <v-btn text v-if="authStore.getIsLoginSuccessful" @click="redirect('/my-tasks')">My Tasks</v-btn>
    <v-btn text v-if="authStore.getIsLoginSuccessful && $route.path!=='/'" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { useAuthStore } from '~/store/authStore';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    
    const logout = async () => {
      await authStore.logout();
      router.push('/'); 
    };

    return {
      authStore,
      route,
      logout,
    };
  },
  methods: {
    redirect(path) {
      this.$router.push({ path });
    },
  }
};
</script>
