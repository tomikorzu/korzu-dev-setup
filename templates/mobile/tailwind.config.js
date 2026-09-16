/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // keep in sync with constants/Colors.ts's `light.tint`
        tint: "#16A34A",
      },
    },
  },
  plugins: [],
};
