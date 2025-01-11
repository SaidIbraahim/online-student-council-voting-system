import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Use environment variable or fallback
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token if available
    }
    console.log('Making API request:', config); // Log the request for debugging
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API response:', response); // Log the response for debugging
    return response;
  },
  (error) => {
    console.error('API error response:', error.response || error.message); // Log errors
    if (error.response && error.response.status === 401) {
      // Check if the error occurred during login
      if (
        error.config.url.includes('/auth/login-voter') ||
        error.config.url.includes('/admin/login-admin')
      ) {
        return Promise.reject(error); // Pass errors from login endpoints to the calling function
      }

      // Handle unauthorized access globally
      localStorage.removeItem('token'); // Clear token
      window.location.href = '/login'; // Redirect to login page
    } else if (error.message === 'Network Error') {
      alert('Network error. Please check your connection and try again.'); // Handle network issues
    }
    return Promise.reject(error); // Pass the error to the calling function
  }
);

export default api;
