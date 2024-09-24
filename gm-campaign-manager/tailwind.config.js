/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // if using the app directory
  ],
  darkMode: 'class', // Enables dark mode based on a class
  theme: {
    extend: {
      colors: {
        'cyberpunk-orange': '#E36B51',
        'cyberpunk-blue': '#08213F',
        'cyberpunk-pink': '#CFACB3',
        'cyberpunk-black': '#141825',
      },
    },
  },
  plugins: [],
};