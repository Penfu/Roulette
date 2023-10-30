/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
      transitionProperty: {
        width: "width",
      },
      animation: {
        "roulette-loader": "roulette-loader 3s infinite linear",
      },
      keyframes: {
        "roulette-loader": {
          "0%": {
            scale: 1,
            transform: "rotate(0deg)",
          },
          "40%": {
            scale: "0.7",
            transform: "rotate(120deg)",
          },
          "80%": {
            scale: "0.8",
            transform: "rotate(600deg)",
          },
          "100%": {
            scale: 1,
            transform: "rotate(720deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
