/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {colors: {
      primary: {
        DEFAULT: '#22B2DC',
        dark:   '#1B8CB0',
      },
      secondary: '#FF6B6B',
      accent:    '#FFD93D',
      neutral: {
        100: '#F8F9FA',
        700: '#495057',
      },
      success: '#4CAF50',
      error:   '#DC3545',
    },},
  },
  plugins: [],
}
