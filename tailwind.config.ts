import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          bg: "#02040a",
          surface: "rgba(2, 4, 10, 0.88)",
          "surface-light": "rgba(4, 8, 18, 0.75)",
          border: "rgba(0, 229, 255, 0.15)",
          "border-bright": "rgba(0, 229, 255, 0.35)",
          cyan: "#00E5FF",
          "cyan-dim": "rgba(0, 229, 255, 0.15)",
          "cyan-glow": "rgba(0, 229, 255, 0.4)",
          violet: "#7B2CBF",
          "violet-dim": "rgba(123, 44, 191, 0.2)",
          "violet-glow": "rgba(123, 44, 191, 0.5)",
          text: "#E2E8F0",
          "text-pale": "#A5F3FC",
          "text-muted": "rgba(165, 243, 252, 0.6)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        "hud-cyan": "0 0 20px -3px rgba(0, 229, 255, 0.35)",
        "hud-cyan-lg": "0 0 35px 2px rgba(0, 229, 255, 0.45)",
        "hud-violet": "0 0 20px -3px rgba(123, 44, 191, 0.4)",
        "hud-glow": "0 0 25px rgba(0, 229, 255, 0.2), inset 0 0 15px rgba(123, 44, 191, 0.15)",
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse-slow": "spin-reverse 30s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wave-pulse": "wavePulse 2s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        wavePulse: {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(0.8)" },
          "50%": { opacity: "1", transform: "scaleY(1.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
