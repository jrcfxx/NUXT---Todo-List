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

    async cleanStore() {
      this.roles = [];
      this.permissions = [];
      this.userEmail = '';
      localStorage.removeItem('token');
    },

    loadFromLocalStorage() {
      const token = localStorage.getItem('token');
      return token;
    },

    async login(email, password) {
      const { $api } = useNuxtApp();

      try {
        const response = await $api.post('/login', { email, password });
        
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          await this.getUserInfo();
        }
      } catch (error) {
        alert('Login failed');
      }
    },

    async logout() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.post('/logout');
        this.cleanStore();
      } catch (error) {
        alert('Logout failed');
      }
    },

    async getUserInfo() {
      const { $api } = useNuxtApp();

      try {
        const token = this.loadFromLocalStorage();
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await $api.get('/user-info');

        if (!response || response.error) {
          this.cleanStore();
          return { error: true };
        }

        this.setRoles(response.data.roles);
        this.setPermissions(response.data.permissions);
        this.setUserEmail(response.data.email);

        return response.data;
      } catch (error) {
        return { error: true };
      }
    },
  },
});