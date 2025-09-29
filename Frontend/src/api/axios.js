// Frontend/src/api/axios.js :

import axios from 'axios';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});
// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔍 [axios.js] Request for:', config.url, 'Token exists:', !!token, 'Full token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ [axios.js] Authorization header set with:', token);
    } else {
      console.log('❌ No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log('✅ [axios.js] Response:', response.status, response.config.url, 'Data:', response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'An error occurred';

    console.error('❌ API Error Details:', {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data
    });

    // Only handle 401 for non-critical endpoints; let AuthContext handle /auth/me
    if (status === 401 && error.config.url !== '/auth/me') {
      console.log('🔐 Authentication failed - clearing tokens');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
      setTimeout(() => {
        window.location.replace('/auth/login');
      }, 100);
    } else if (status === 400) {
      error.message = message;
      toast.error(message);
    } else if (status === 500) {
      error.message = 'Server error. Please try again later.';
      toast.error(error.message);
    } else if (error.code === 'ECONNREFUSED') {
      error.message = 'Cannot connect to server. Please ensure backend is running.';
      toast.error(error.message);
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please try again.';
      toast.error(error.message);
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default instance;
