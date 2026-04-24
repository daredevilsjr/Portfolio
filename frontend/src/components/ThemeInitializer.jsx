import { useEffect } from 'react';

const ThemeInitializer = () => {
  useEffect(() => {
    // Force dark mode always by adding the class to document
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark');
      // Set color scheme for better browser compatibility
      document.documentElement.style.colorScheme = 'dark';
    }
  }, []);

  return null;
};

export default ThemeInitializer;
