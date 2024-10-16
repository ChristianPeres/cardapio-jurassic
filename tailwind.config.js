/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}', 
    './layouts/**/*.vue', 
    './pages/**/*.vue', 
    './plugins/**/*.{js,ts}', 
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        'main-green': '#000000',
        'main-dark-green': '#000000',
        'main-light-green': '##000000',
        'bg-custom-green': '#FFFFFF',
        'bg-green': '#000000',
        'bg-button': '#000000'
      },
    },
  },
};