/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "score-red": "#ef4444",
        "score-yellow": "#eab308",
        "score-green": "#22c55e",
      },
    },
  },
  plugins: [],
};
