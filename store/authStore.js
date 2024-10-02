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
    getIsLoginSuccessful: (state)=>state.token!=='',
  },
  actions: {
    setRoles(roles){
      this.roles=roles
    },
    setPermissions(permissions){
      this.permissions=permissions
    },
    setToken(token){
      this.token=token
    },

    async cleanStore() {
      this.roles=[];
      this.permissions=[];
      this.token='';
    },

    async logout() {
      const { $api } = useNuxtApp();

      try {
        await $api.post('/logout');

        this.cleanStore();

      } catch (error) {
        alert("Erro ao fazer logout");
      }
      

    }
  },
});