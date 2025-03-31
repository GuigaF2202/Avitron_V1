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
         'gold': '#a57c00',
         'bergundy': '#0d0003'
      },
boxShadow: {
  'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
  'neon-pink': '0 0 10px rgba(255, 0, 85, 0.5)',
  'neon': '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.5)',
}
    },
  },
  plugins: [],
}
