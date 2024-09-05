<template>
  <!-- Involves the entire application -->
  <v-app>
     <NavBar />

    <v-main>
      <v-container id="login" class="mt-12">
        <v-row justify="center">
          <v-col cols="12" md="6">
            <div>
              <h2 class="text-h4 mb-3 text-primary">Login</h2>
              <p class="text-subtitle-1 mb-4 text-secondary">Please enter your credentials to continue.</p>
            </div>

            <v-form @submit.prevent="login">
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
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Send the credentials to the login endpoint
        // await: pauses the execution of the login function until the Promise returned is resolved (or rejected)
        // $api: Axios instance
        const response = await this.$api.post('/login', {
          email: this.email,
          password: this.password,
        });

        console.log(response.data);

        if (response.data) {
          localStorage.setItem('authToken', response.data.token);
          this.$router.push({ path: '/tasks' });
        } else {
          console.error('Login failed: User data not found.');
          alert('Login failed. User data not found.');
        }
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
};
</script>


