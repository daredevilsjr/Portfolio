/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New improved color palette
        'rich-black': {
          DEFAULT: '#000814',
          100: '#000204',
          200: '#000308',
          300: '#00050c',
          400: '#000710',
          500: '#000814',
          600: '#002f76',
          700: '#0056d8',
          800: '#3b89ff',
          900: '#9dc4ff'
        },
        'oxford-blue': {
          DEFAULT: '#001d3d',
          100: '#00060c',
          200: '#000c18',
          300: '#001225',
          400: '#001831',
          500: '#001d3d',
          600: '#004997',
          700: '#0074f1',
          800: '#4ba2ff',
          900: '#a5d1ff'
        },
        'yale-blue': {
          DEFAULT: '#003566',
          100: '#000b14',
          200: '#001529',
          300: '#00203d',
          400: '#002a52',
          500: '#003566',
          600: '#005fb8',
          700: '#0a89ff',
          800: '#5cb0ff',
          900: '#add8ff'
        },
        'mikado-yellow': {
          DEFAULT: '#ffc300',
          100: '#332700',
          200: '#664e00',
          300: '#997500',
          400: '#cc9c00',
          500: '#ffc300',
          600: '#ffcf33',
          700: '#ffdb66',
          800: '#ffe799',
          900: '#fff3cc'
        },
        'gold': {
          DEFAULT: '#ffd60a',
          100: '#352c00',
          200: '#6a5800',
          300: '#9f8500',
          400: '#d4b100',
          500: '#ffd60a',
          600: '#ffde3b',
          700: '#ffe76c',
          800: '#ffef9d',
          900: '#fff7ce'
        },
        
        // Enhanced primary colors using the new palette
        primary: {
          50: '#add8ff',
          100: '#9dc4ff',
          200: '#5cb0ff',
          300: '#0a89ff',
          400: '#005fb8',
          500: '#003566',
          600: '#002a52',
          700: '#00203d',
          800: '#001529',
          900: '#000b14',
        },
        
        // Accent colors using yellow/gold
        accent: {
          50: '#fff7ce',
          100: '#fff3cc',
          200: '#ffef9d',
          300: '#ffe799',
          400: '#ffdb66',
          500: '#ffc300',
          600: '#cc9c00',
          700: '#997500',
          800: '#664e00',
          900: '#332700',
        },
        
        // Dark theme colors
        dark: {
          50: '#9dc4ff',
          100: '#3b89ff',
          200: '#0056d8',
          300: '#002f76',
          400: '#000814',
          500: '#000710',
          600: '#00050c',
          700: '#000308',
          800: '#000204',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
        'border-beam': 'border-beam 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 195, 0, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 195, 0, 0.8)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 195, 0, 0.3)',
        'glow': '0 0 20px rgba(255, 195, 0, 0.4)',
        'glow-lg': '0 0 40px rgba(255, 195, 0, 0.6)',
        'glow-xl': '0 0 60px rgba(255, 195, 0, 0.8)',
        'inner-glow': 'inset 0 0 20px rgba(255, 195, 0, 0.2)',
        'neon': '0 0 5px #ffc300, 0 0 20px #ffc300, 0 0 35px #ffc300',
        'neon-blue': '0 0 5px #003566, 0 0 20px #003566, 0 0 35px #003566',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #000814 0%, #001d3d 25%, #003566 50%, #ffc300 75%, #ffd60a 100%)',
        'gradient-warm': 'linear-gradient(135deg, #ffd60a 0%, #ffc300 25%, #cc9c00 50%, #997500 75%, #664e00 100%)',
        'gradient-cool': 'linear-gradient(135deg, #000814 0%, #001d3d 50%, #003566 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
