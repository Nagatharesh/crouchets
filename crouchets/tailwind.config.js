/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#d62839',
        teal: '#2a9d8f',
        cream: '#fdf9f5',
        warm: '#f7ede2',
        dark: '#1c1410',
        mid: '#5c4a3a',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'glass': 'linear-gradient(to bottom right, rgba(253,249,245,0.7), rgba(253,249,245,0.3))',
      }
    },
  },
  plugins: [],
}
