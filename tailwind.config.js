/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      blue: {
        900: "#172b4d",
        "172b4d": "#172b4d",
      },
    },
  },
  plugins: [],
};
