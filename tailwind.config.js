/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: {
        900: "#172b4d",
      },
      red: {
        600: "#dc2626",
      },
      gray: {
        100: "#f3f4f6",
        400: "#9ca3af",
      },
      white: "#ffffff",
    },
  },
  plugins: [],
};
