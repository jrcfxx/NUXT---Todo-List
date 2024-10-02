<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-col cols="12" md="6" class="text-center">
        <h1>Access Denied</h1>
        <p>You are not allowed to access this page.</p>
        <v-btn color="primary" @click="$router.push('/')">Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
