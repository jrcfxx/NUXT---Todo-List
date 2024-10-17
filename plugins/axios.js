// This plugin creates an instance of Axios and configures it with the baseURL of your Laravel API. 
// Also adds the authentication token to each request, if available.

import axios from 'axios';
import { useAuthStore } from '~/store/authStore';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  // Creates an instance of Axios with the baseURL of the Laravel API
  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true, // Allows the sending of cookies together with the request
  })

  // Intercepting every Axios request before it is sent
  api.interceptors.request.use((config) => {
    // Retrieve the authentication token from the state
    const token = localStorage.getItem('token');

    // If the token exists, attach it to the Authorization header of the request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Return the updated configuration object with the headers
    return config
  })

  // Provides the configured Axios instance across the Nuxt application
  nuxtApp.provide('api', api)
})