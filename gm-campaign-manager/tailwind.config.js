/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enables dark mode based on a class
  theme: {
    extend: {
      colors: {
        'cyberpunk-pink': '#FF007C',
        'cyberpunk-black': '#0D0D0D',
      },
    },
  },
  plugins: [],
};
