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
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Segoe UI", "Roboto", "Arial", "sans-serif"]
      },
      colors: {
        // Sinal Digital: marinho, azul, ciano suave e superfícies claras.
        // Verde fica reservado aos elementos de WhatsApp (`whatsapp`).
        brand: {
          night: "#020F24",
          navy: "#031B3A",
          deep: "#052D5F",
          ink: "#063A78",
          blue: "#0B6ACB",
          sky: "#35BDF2",
          cyan: "#7DD3FC",
          mist: "#E6F4FB",
          surface: "#EDF4FA",
          line: "#D5E3EF"
        },
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#075E54",
          hover: "#0A7A6D",
          ink: "#06301F"
        },
        // Tokens abaixo pertencem ao app legado de Business English.
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
