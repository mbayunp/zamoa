/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zamoa-green': '#006B3F',
        'zamoa-orange': '#F15A24',
        'zamoa-yellow': '#FBB03B',
        'zamoa-dark': '#1B1464',
      }
    },
  },
  plugins: [],
}