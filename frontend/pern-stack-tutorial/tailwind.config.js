import daisyui from "daisyui"
import daisyuiS from "daisyui"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // Use require() to load the daisyui plugin
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "night",
      "pastel",
      "retro",
      "coffee",
      "forest",
      "cyberpunk",
      "synthwave",
      "luxury",
      "autumn",
      "valentine",
      "aqua",
      "business",
      "night",
      "dracula"
    ],
  }
}