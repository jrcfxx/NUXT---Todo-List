<template>
  <v-app-bar app color="primary" dark>
    <v-icon class="pl-10">mdi-check</v-icon>
    <v-toolbar-title>Todo List</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="goToHome">Home</v-btn>
    <v-btn text @click="goToMyTasks">My Tasks</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ path: '/tasks' });
    },
    goToMyTasks() {
      this.$router.push({ path: '/my-tasks' });
    },
  },
};
</script>
