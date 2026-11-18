import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1F2937",
        sand: "#F8F4EE",
        blush: "#F4D8D8",
        coral: "#E98C75",
        rosewood: "#8D4E5F",
        teal: "#1E6F73",
        mint: "#CDE8D5",
        gold: "#D4A746",
        slateblue: "#52607A"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(33, 53, 85, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
