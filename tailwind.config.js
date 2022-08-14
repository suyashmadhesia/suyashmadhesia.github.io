/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html', './src/*.html', './src/assets/*.html'],
  theme: {
    screens:{
      'sm': '500px',
      'md': '600px',
      'lg': '1024px',
    },
    extend: {},
  },
  plugins: [],
}
