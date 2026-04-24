import { create } from 'zustand';

// Simplified theme store - always dark mode
const useThemeStore = create((set, get) => ({
  isDark: true, // Always dark
  
  // Keep these methods for compatibility but they won't change anything
  toggleTheme: () => {
    // Do nothing - always stay dark
  },
  
  setTheme: (isDark) => {
    // Do nothing - always stay dark
  }
}));

export default useThemeStore;
