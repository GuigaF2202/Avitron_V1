/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00F0FF',
        'neon-pink': '#FF0055',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
        'neon-pink': '0 0 10px rgba(255, 0, 85, 0.5)',
      }
    },
  },
  plugins: [],
}
