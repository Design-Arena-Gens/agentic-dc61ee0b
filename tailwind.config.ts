import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81"
        },
        accent: {
          400: "#f97316",
          500: "#ea580c",
          600: "#c2410c"
        },
        "bharat-deep": "#0b3d2e",
        "bharat-sage": "#12836d",
        "bharat-gold": "#f59e0b"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        emerald: "0 10px 40px rgba(18, 131, 109, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
