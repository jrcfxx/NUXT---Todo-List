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
    token: '',
    isLoginSuccessful: false 

  }),
  getters: {
    getRoles: (state)=>state.roles,
    getPermissions: (state)=>state.permissions,
    getToken: (state)=>state.token,
    // If state.token is a valid token (non-empty string), !!state.token will return true.
    getIsLoginSuccessful: (state) => !!state.token,
  },
  actions: {
    setRoles(roles){
      this.roles=roles
    },
    setPermissions(permissions) {
      this.permissions = permissions;
      // Sets the user permissions in the store and saves them to localStorage on the client side.
      if (process.client) {
        localStorage.setItem('userPermissions', JSON.stringify(permissions));
      }
    },
    setToken(token) {
      this.token = token;
      // Sets the authentication token in the store and saves it to localStorage on the client side. 
      if (process.client) {
        localStorage.setItem('authToken', token); 
      }
      this.isLoginSuccessful = !!token; 
    },

    // Restores the token and permissions from localStorage (client-side only) and updates the state accordingly.
    initializeStore() {
      if (process.client) {
        const token = localStorage.getItem('authToken');
        const permissions = localStorage.getItem('userPermissions');
    
        if (token) {
          this.token = token;
          this.isLoginSuccessful = true;
          this.permissions = permissions ? JSON.parse(permissions) : [];
        } else {
          this.isLoginSuccessful = false;
        }
      }
    },
    

    // Clears the store's state and removes the token and permissions from localStorage
    async cleanStore() {
      this.roles = [];
      this.permissions = [];
      this.token = '';
      if (process.client) {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('userPermissions');
      }
      this.isLoginSuccessful = false;
    },

    
    async logout() {
      const { $api } = useNuxtApp();
      try {
        await $api.post('/logout');
        // Clears the store and removes token/permissions
        this.cleanStore();
      } catch (error) {
        alert("Erro ao fazer logout");
      }
    }
  },
});