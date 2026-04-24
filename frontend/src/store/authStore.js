import { create } from 'zustand';
import api from '../utils/api';

// Simple auth store without persistence to avoid hydration issues
const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  redirectPath: null, // Store redirect path for after login
  hasInitialized: false, // Track if we've done initial auth check

  // Set redirect path
  setRedirectPath: (path) => {
    set({ redirectPath: path });
  },

  // Clear redirect path
  clearRedirectPath: () => {
    set({ redirectPath: null });
  },

  // Login action
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', credentials);
      const { user } = response.data;
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        hasInitialized: true
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
        hasInitialized: true
      });
      return { success: false, error: errorMessage };
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true });
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        redirectPath: null,
        hasInitialized: true
      });
    }
  },

  // Check auth status - improved with proper state management
  checkAuth: async () => {
    const currentState = get();
    
    // Prevent multiple simultaneous calls
    if (currentState.isLoading) {
      return;
    }
    
    set({ isLoading: true });
    
    try {
      const response = await api.get('/auth/me');
      const { user } = response.data;
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        hasInitialized: true
      });
    } catch (error) {
      // Only log error if it's not a 401 (unauthorized)
      if (error.response?.status !== 401) {
        console.error('Auth check error:', error);
      }
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        hasInitialized: true
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset auth state
  resetAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      redirectPath: null,
      hasInitialized: false
    });
  }
}));

export default useAuthStore;
