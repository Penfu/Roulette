/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bkg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          1: "rgb(var(--color-bg-1) / <alpha-value>)",
        },
        white: {
          DEFAULT: "rgb(var(--color-white))",
        },
        gray: {
          50: "rgb(var(--color-gray-50) / <alpha-value>)",
          100: "rgb(var(--color-gray-100) / <alpha-value>)",
          200: "rgb(var(--color-gray-200) / <alpha-value>)",
          300: "rgb(var(--color-gray-300) / <alpha-value>)",
          700: "rgb(var(--color-gray-700) / <alpha-value>)",
        },
        red: {
          DEFAULT: "rgb(var(--color-red) / <alpha-value>)",
          light: "rgb(var(--color-red-light) / <alpha-value>)",
          dark: "rgb(var(--color-red-dark) / <alpha-value>)",
        },
        black: {
          DEFAULT: "rgb(var(--color-black) / <alpha-value>)",
          light: "rgb(var(--color-black-light) / <alpha-value>)",
          dark: "rgb(var(--color-black-dark) / <alpha-value>)",
        },
        green: {
          DEFAULT: "rgb(var(--color-green) / <alpha-value>)",
          light: "rgb(var(--color-green-light) / <alpha-value>)",
          dark: "rgb(var(--color-green-dark) / <alpha-value>)",
        },
        skeleton: {
          DEFAULT: "rgb(var(--color-skeleton) / <alpha-value>)",
        },
      },
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
