/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js,handlebars}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "coffee", "halloween"],
  },
};
