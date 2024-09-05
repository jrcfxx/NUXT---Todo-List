<template>
  <v-app-bar app color="primary" dark>
    <v-icon class="pl-10">mdi-check</v-icon>
    <v-toolbar-title>Todo List</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="redirect('/tasks')">Home</v-btn>
    <v-btn text @click="redirect('/my-tasks')">My Tasks</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    redirect(path) {
      this.$router.push({ path });
    },
  }
};
</script>
