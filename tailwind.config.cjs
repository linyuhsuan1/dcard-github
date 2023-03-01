/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue: {
          'dcard': '#006aa6',
          'dcardBtn':'#3397cf',
        },
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
}
