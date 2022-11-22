/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        CorUp: ["CorUp", "serif"],
        Poppins: ["Poppins", "san-serif"],
      },
    },
  },
  plugins: [],
};
