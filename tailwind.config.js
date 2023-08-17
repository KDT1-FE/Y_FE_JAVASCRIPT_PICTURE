/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./pages/moreInfo/*.{html,js}",
    "./pages/playground/playground.html",
    "./js/*.js"
  ],
  theme: {
    fontFamily:{
      'Pretendard': ['Pretendard','sans']
    },
    extend: {
      colors: {
        'regal-blue': '#243c5a',
      },
    },
  },
  plugins: [],
}

