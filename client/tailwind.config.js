/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
          primary: "#166272", // Add your custom color with a key of your choice (e.g., "primary")
        },
    },
  },
  plugins: [
  ],
};
