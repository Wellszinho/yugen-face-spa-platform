import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        yugen: {
          sand: "#F7F4EC",
          oat: "#FCFAF5",
          sage: "#F2EEE3",
          clay: "#E4DDCE",
          terracotta: "#A66E52",
          ochre: "#B9A06A",
          moss: "#687441",
          leaf: "#87945D",
          ink: "#292820",
          muted: "#777268"
        }
      },
      fontFamily: {
        serif: ["var(--font-yugen-serif)", "Georgia", "serif"],
        sans: ["var(--font-yugen-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        yugen: "0 18px 42px rgba(41, 40, 32, 0.055)"
      }
    }
  },
  plugins: []
};

export default config;
