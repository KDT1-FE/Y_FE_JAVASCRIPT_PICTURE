/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      lineHeight: {
        12: '4rem',
      },
      top: {
        120: '120%',
      },
    },
  },
  plugins: [],
};
