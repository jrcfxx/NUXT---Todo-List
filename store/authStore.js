import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    /**
     * @type {string[]}
     */
    roles: [],
    /**
     * @type {string[]}
     */
    permissions: [],
    userEmail: '',
  }),

  getters: {
    getRoles: (state)=>state.roles,
    getPermissions: (state)=>state.permissions,
    getUserEmail: (state) => state.userEmail,
  },

  actions: {
    setRoles(roles) {
      this.roles = roles;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserEmail(userEmail) {
      this.userEmail = userEmail;
    },

    cleanStore() {
      this.roles = [];
      this.permissions = [];
      this.userEmail = '';
      localStorage.removeItem('token');
    },

    getTokenFromStorage() {
      return localStorage.getItem('token');
    },

    async login(email, password) {
      const { $api } = useNuxtApp();

      await $api.post('/login', { email, password }).then(
        async (response) => {
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          // retrieve user information
          await this.getUserInfo();
        }
      }).catch(() => alert('Login failed'));
    },

    async logout() {
      const { $api } = useNuxtApp();

      await $api.post('/logout').then(() => {
        this.cleanStore();
      }).catch(() => { alert('Logout failed')});
    },

    // retrieve user information
    async getUserInfo() {
      const { $api } = useNuxtApp();

      return await $api.get('/user-info').then(response => {
        this.setRoles(response.data.roles);
        this.setPermissions(response.data.permissions);
        this.setUserEmail(response.data.email);
        return true
      }).catch(() => false) 
    },
  },
});