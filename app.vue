<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ path: '/' }); 
    },
    goToMyTasks() {
      this.$router.push({ path: '/tasks' }); 
    },
  },
};
</script>
