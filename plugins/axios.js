// This plugin creates an instance of Axios and configures it with the baseURL of your Laravel API. 
// Also adds the authentication token to each request, if available.

import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  // Creates an instance of Axios with the baseURL of the Laravel API
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  })

  // Intercepting every Axios request before it is sent
  api.interceptors.request.use((config) => {
// Retrieve the authentication token from the local storage
    const token = localStorage.getItem('authToken')

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