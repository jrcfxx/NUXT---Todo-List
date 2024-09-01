// This plugin creates an instance of Axios and configures it with the baseURL of your Laravel API. 
// Also adds the authentication token to each request, if available.

export default function({ $axios }) {
    // Intercepting every Axios request before it is sent
    $axios.onRequest(config => {
      // Retrieve the authentication token from the local storage
      const token = localStorage.getItem('authToken'); 
      // If the token exists, attach it to the Authorization header of the request
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
      // Return the updated configuration object with the headers
      return config;
    });
  }
