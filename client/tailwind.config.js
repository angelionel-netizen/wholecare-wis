/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        harvestGreen: '#1A531A',
        harvestCream: '#FFFDD0',
        harvestGold: '#D4AF37',
      }
    },
  },
  plugins: [],
}