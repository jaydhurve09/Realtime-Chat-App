import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  config => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Combined response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Request failed:', error.config?.url, error.message, error.response?.status);
    
    if (error.response?.status === 401) {
      console.log('Unauthorized access, redirecting to login...');
    }
    
    return Promise.reject(error);
  }
);

// export default axiosInstance;