/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./Assets/JS/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'suse': ['Suse', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

