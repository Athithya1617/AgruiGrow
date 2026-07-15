import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to extract data automatically
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API call failed:", error.response || error.message || error);
    return Promise.reject(error);
  }
);

export const apiClient = {
  get: (endpoint) => axiosInstance.get(endpoint),
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
  put: (endpoint, data) => axiosInstance.put(endpoint, data),
  delete: (endpoint) => axiosInstance.delete(endpoint)
};
