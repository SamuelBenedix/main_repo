// utils/api.ts
import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:3001/api', // your API base
 headers: {
  'Content-Type': 'application/json',
 },
});

// 👉 Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
 const token = localStorage.getItem('authToken');
 if (token) {
  config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});

// 👉 Add a response interceptor to handle expired/invalid token
api.interceptors.response.use(
 (response) => response,
 (error) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
   localStorage.removeItem('authToken');
   window.location.href = '/login'; // 🔁 redirect to login
  }
  return Promise.reject(error);
 }
);

export default api;
