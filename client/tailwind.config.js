/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FFD700',
          500: '#FFC700',
          600: '#DAA520'
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
