/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/components/**/*.{js,vue,ts}", "./app/layouts/**/*.vue", "./app/pages/**/*.vue", "./app/plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./app/app.vue"],
  theme: {
    extend: {
      colors: {
        primary: "#EB455F",
        secondary: "#2B3467",
        background: "#FCFFE755"
      }
    }
  },
  plugins: []
};
