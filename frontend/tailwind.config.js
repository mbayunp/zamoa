/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zamoa-navy': '#0A0A44',
        'zamoa-dark': '#0A0A44',
        'zamoa-green': '#006B3F',
        'zamoa-orange': '#F15A24',
        'zamoa-yellow': '#FBB03B',
      }
    },
  },
  plugins: [],
}