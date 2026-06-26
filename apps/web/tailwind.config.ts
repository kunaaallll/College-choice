import type { Config } from "tailwindcss";

// Theme tokens lifted from the original College Choice design.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
        },
        ink: {
          DEFAULT: "#17132b",
          900: "#1a1535",
          700: "#3a3654",
          500: "#5b5872",
          400: "#8b89a0",
        },
        line: "#e7e5f0",
        success: "#16a34a",
        warn: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(23,19,43,0.06), 0 8px 24px -12px rgba(23,19,43,0.12)",
        pop: "0 20px 60px -20px rgba(23,19,43,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
