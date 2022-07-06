/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html', './src/*.html', './src/assets/*.html'],
  theme: {
    screens:{
      'sm': '600px',
      // => @media (min-width: 640px) { ... }

      'md': '700px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
