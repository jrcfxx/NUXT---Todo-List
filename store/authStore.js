import { defineStore } from 'pinia';

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
    getIsLoginSuccessful: (state)=>state.isLoginSuccessful,
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
    setIsLoginSuccessful(){
      this.isLoginSuccessful=this.token!==''
    },
  },
});