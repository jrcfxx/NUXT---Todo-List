<template>
  <!-- Involves the entire application -->
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon class="mr-2">mdi-check</v-icon>
      <v-toolbar-title>Todo List</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container id="login" class="mt-12">
        <v-row justify="center">
          <v-col cols="12" md="6">
            <div>
              <h2 class="text-h4 mb-3 text-primary">Login</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Please enter your credentials to continue.</p>
            </div>

            <v-form @submit.prevent>
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

              <v-btn color="primary" dark type="submit" block>Login</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    login() {
      //
    },
  },
};
</script>


