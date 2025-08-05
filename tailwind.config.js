/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Barlow: ["Barlow Condensed", 'sans-serif'],

      },
    },
    
  },
  daisyui: {
    themes: ["light", "black"],
    
  },
  darkMode: ['class', '[data-theme="black"]'],
  plugins: [
    require('daisyui'),
  ],
}
