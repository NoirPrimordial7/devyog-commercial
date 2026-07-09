/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#080a0b",
        graphite: "#111416",
        champagne: "#c8a96a",
        ivory: "#f2efe8",
      },
      fontFamily: {
        sans: ["Manrope Variable", "Arial", "sans-serif"],
        serif: ["Bodoni 72", "Bodoni MT", "Didot", "Times New Roman", "serif"],
      },
      letterSpacing: {
        mega: "-0.075em",
      },
    },
  },
  plugins: [],
};
