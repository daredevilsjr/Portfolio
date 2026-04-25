import axios from 'axios';

// Determine API URL based on environment
const getAPIUrl = () => {
  // Production: use VITE_API_URL from environment
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Development: detect backend URL
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    // Local development - use localhost
    return 'http://localhost:5000/api';
  }
  
  // Fallback
  return '/api';
};

const API_BASE_URL = getAPIUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000, // 45 second timeout for Render cold starts
});

// Retry configuration for cold start handling
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to retry failed requests
const retryRequest = async (config, retryCount = 0) => {
  try {
    return await axios(config);
  } catch (error) {
    // Retry on timeout or 503 Service Unavailable (Render cold start)
    if (
      retryCount < MAX_RETRIES &&
      (error.code === 'ECONNABORTED' || 
       error.response?.status === 503 ||
       error.message.includes('timeout'))
    ) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
      return retryRequest(config, retryCount + 1);
    }
    throw error;
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle cold starts by retrying
    if (
      error.code === 'ECONNABORTED' || 
      error.response?.status === 503 ||
      error.message.includes('timeout')
    ) {
      // Retry the request
      try {
        return await retryRequest(error.config);
      } catch (retryError) {
        if (retryError.response?.status === 401) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(retryError);
      }
    }

    if (error.response?.status === 401) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
