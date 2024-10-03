import axios from "axios";
axios.defaults.baseURL = 'https://nodejs-mongo-task.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
        config.headers['Authorization'] = token; // Attach the token
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token'); // Optionally, remove the expired token
        window.location.href = '/';  // Redirect to login page
      }
      return Promise.reject(error); // Return the error for further handling
    }
);

export default axios